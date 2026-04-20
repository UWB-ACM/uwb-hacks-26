import { RefObject } from "react";

export interface CommitteeMember {
    name: string;
    image_path: string;
    roles: string[];
    link: string;
}

export const committeeMembers: CommitteeMember[] = [
    {
        name: "Alan Talavera",
        image_path: "/MeetTheTeamPhotos/AlanTalavera.jpg",
        roles: ["Digital Experience"],
        link: "https://www.linkedin.com/in/alan-corvera/",
    },
    {
        name: "Ashley Tsang",
        image_path: "/MeetTheTeamPhotos/AshleyTsang.jpg",
        roles: ["Production Management", "Marketing"],
        link: "https://www.linkedin.com/in/ashleytsang29/",
    },
    {
        name: "Ayaan Ali",
        image_path: "/MeetTheTeamPhotos/AyaanAli.jpg",
        roles: ["Production Management"],
        link: "https://www.linkedin.com/in/ayaan-ali30/",
    },
    {
        name: "Isabella Ta",
        image_path: "/MeetTheTeamPhotos/IsabellaTa.png",
        roles: ["Marketing"],
        link: "https://www.linkedin.com/in/isabella-ta-0a91a82aa/",
    },
    {
        name: "Jonah Uellenberg",
        image_path: "/MeetTheTeamPhotos/JonahUellenberg.png",
        roles: ["Digital Experience"],
        link: "https://www.linkedin.com/in/uellenberg/",
    },
    {
        name: "Kenneth Angeles",
        image_path: "/MeetTheTeamPhotos/KennethAngeles.jpg",
        roles: ["Digital Experience"],
        link: "https://www.linkedin.com/in/kenneth-angeles-05632a2a9/",
    },
    {
        name: "Meeti Gobindpuri",
        image_path: "/MeetTheTeamPhotos/MeetiGobindpuri.jpg",
        roles: ["Marketing"],
        link: "https://www.linkedin.com/in/khushmeetgobindpuri/",
    },
    {
        name: "Nainoo Gobindpuri",
        image_path: "/MeetTheTeamPhotos/NainooGobindpuri.jpg",
        roles: ["Sponsorships"],
        link: "https://www.linkedin.com/in/khushnain-gobindpuri/",
    },
    {
        name: "Nandini Mistry",
        image_path: "/MeetTheTeamPhotos/NandiniMistry.jpg",
        roles: ["Production Management", "Content and Design"],
        link: "https://www.linkedin.com/in/nandinimist/",
    },
    {
        name: "Phohanh Tran",
        image_path: "/MeetTheTeamPhotos/PhohanhTran.jpg",
        roles: ["Digital Experience"],
        link: "https://www.linkedin.com/in/phohanh-tran/",
    },
    {
        name: "Prarin Behdarvandian",
        image_path: "/MeetTheTeamPhotos/PrarinBehdarvandian.png",
        roles: ["Content and Design"],
        link: "https://www.linkedin.com/in/p-behdar/",
    },
    {
        name: "Preeti Gobindpuri",
        image_path: "/MeetTheTeamPhotos/PreetiGobindpuri.png",
        roles: ["Digital Experience"],
        link: "https://www.linkedin.com/in/khushpreet-gobindpuri/",
    },
    {
        name: "Rasajna Kolusu",
        image_path: "/MeetTheTeamPhotos/RasajnaKolusu.jpg",
        roles: ["Content and Design", "Marketing"],
        link: "https://www.linkedin.com/in/sai-rasajna-kolusu/",
    },
    {
        name: "Reagan George",
        image_path: "/MeetTheTeamPhotos/ReaganGeorge.jpg",
        roles: ["Digital Experience"],
        link: "https://www.linkedin.com/in/reagan-george/",
    },
    {
        name: "Seyeon Park",
        image_path: "/MeetTheTeamPhotos/SeyeonPark.jpg",
        roles: ["Sponsorships", "Marketing"],
        link: "https://www.linkedin.com/in/parkseyeon/",
    },
    {
        name: "Sohan Dandu",
        image_path: "/MeetTheTeamPhotos/SohanDandu.jpeg",
        roles: ["Production Management", "Sponsorships"],
        link: "https://www.linkedin.com/in/sohandandu/",
    },
];

export interface MeetTheTeamCloudProps {
    committeeMembers: CommitteeMember[];
    panelContentRef: RefObject<HTMLDivElement | null>;
    committeeMemberIconsRef: RefObject<HTMLDivElement | null>;
    handleClick: (selectedIdx: number) => void;
    selectedMemberIdx: number | null;
}
