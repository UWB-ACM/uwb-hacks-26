import MeetTheTeamCloudDesktop from "./(MeetTheTeamSectionComponents)/MeetTheTeamCloudDesktop";
import MeetTheTeamCloudMobileTablet from "./(MeetTheTeamSectionComponents)/MeetTheTeamCloudMobileTablet";

// TODO: fill out actual committeeMember info
const committeeMembers = [
    {
        "name": "test_name1",
        "image_path": "/HALL-E.png",
        "roles": ["role1", "role2"],
        "link": "https://www.google.com"
    },
    {
        "name": "test_name2",
        "image_path": "/HALL-E.png",
        "roles": ["role1"],
        "link": "https://www.google.com"
    },
    {
        "name": "test_name3",
        "image_path": "/HALL-E.png",
        "roles": ["role1", "role2", "role3"],
        "link": "https://www.google.com"
    },
    {
        "name": "test_name4",
        "image_path": "/HALL-E.png",
        "roles": ["role1", "role2"],
        "link": "https://www.google.com"
    }
]

const MeetTheTeamSection = () => {
    const panelStyles = {
        "panel": "flex flex-col absolute top-0 left-1/2 border-0",
        "header": "border-0 lg:border-0 w-full lg:w-full font-glacial-indifference font-semibold text-[#2b3244] p-3 bg-transparent",
        "content": "p-0 md:p-0 grow relative overflow-hidden"
    }

    return (
        <div className="my-[12vmin]">
            <MeetTheTeamCloudDesktop
                panelStyles={panelStyles}
                committeeMembers={committeeMembers}
            />
            <MeetTheTeamCloudMobileTablet
                panelStyles={panelStyles}
                committeeMembers={committeeMembers}
            />
        </div >
    );
};

export default MeetTheTeamSection;
