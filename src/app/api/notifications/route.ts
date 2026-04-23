import { notifyAll } from "../../../notifications/notify";

export async function POST(req: Request): Promise<Response> {
    try {
        const { message } = await req.json();
        console.log("message in route: " + message);

        await notifyAll(message);
        console.log("called notifyAll ");

        return Response.json({
            success: true,
        });
    } catch {
        return Response.json(
            {
                success: false,
            },
            { status: 500 },
        );
    }
}
