"use server";

import { revalidatePath } from "next/cache";
import sql from "@/src/util/database";

export async function actionAssignJudges() {
    try {
        const allTracks =
            await sql`SELECT id, devpost_tag, track_name FROM tracks`;
        const allProjects =
            await sql`SELECT id, main_track, side_tracks FROM projects`;
        const allJudges = await sql`SELECT id, track_ids FROM judge_info`;
        const existingAssignments =
            await sql`SELECT judge_id, project_id FROM judge_assignments`;

        let newAssignmentsCount = 0;

        for (const project of allProjects) {
            const projectTrackTags = Array.from(
                new Set([project.main_track, ...project.side_tracks]),
            );

            for (const tag of projectTrackTags) {
                if (!tag) continue;

                const track = allTracks.find(
                    (t) =>
                        (t.track_name && t.track_name === tag) ||
                        (t.devpost_tag && t.devpost_tag === tag),
                );

                if (!track) continue;

                const assignedToProject = existingAssignments.filter(
                    (a) => a.project_id === project.id,
                );

                const trackJudgesAssignedCount = assignedToProject.filter(
                    (a) => {
                        const judge = allJudges.find(
                            (j) => j.id === a.judge_id,
                        );
                        return judge?.track_ids
                            .map(Number)
                            .includes(Number(track.id));
                    },
                ).length;

                if (trackJudgesAssignedCount < 2) {
                    const needed = 2 - trackJudgesAssignedCount;

                    const candidates = allJudges.filter((j) => {
                        const judgeQualifiedTracks = j.track_ids.map(Number);
                        const requiredTrackId = Number(track.id);

                        return (
                            judgeQualifiedTracks.includes(requiredTrackId) &&
                            !assignedToProject.some((a) => a.judge_id === j.id)
                        );
                    });

                    for (
                        let i = 0;
                        i < Math.min(needed, candidates.length);
                        i++
                    ) {
                        await sql`
                            INSERT INTO judge_assignments (judge_id, project_id)
                            VALUES (${candidates[i].id}, ${project.id})
                            ON CONFLICT (judge_id, project_id) DO NOTHING
                        `;

                        newAssignmentsCount++;
                        assignedToProject.push({
                            judge_id: candidates[i].id,
                            project_id: project.id,
                        });
                    }
                }
            }
        }

        revalidatePath("/dashboard/judging");
        return { success: true, count: newAssignmentsCount };
    } catch (error) {
        console.error("Assignment Error:", error);
        return { success: false, error: "Database error occurred." };
    }
}
