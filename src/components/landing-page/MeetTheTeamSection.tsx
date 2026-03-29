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
    return (
        <div className="my-[12vmin]">
            <MeetTheTeamCloudDesktop committeeMembers={committeeMembers} />
            <MeetTheTeamCloudMobileTablet committeeMembers={committeeMembers} />
        </div >
    );
};

export default MeetTheTeamSection;
