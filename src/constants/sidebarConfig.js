import { Dashboard, Feed, ListAlt, Message, PostAdd } from "@mui/icons-material";

export const sidebarData = [
    {
        id: 1,
        title: "Home",
        url: "/dashboard",
        icon: Dashboard
    },
    {
        id: 2,
        title: "Add new project",
        url: "/dashboard/add-project",
        icon: PostAdd
    },
    {
        id: 3,
        title: "Your Projects",
        url: "/dashboard/projects",
        icon: ListAlt
    },
    {
        id: 4,
        title: "Your Info",
        url: "/dashboard/info",
        icon: Feed
    },
    {
        id: 5,
        title: "Messages",
        url: "/dashboard/messages",
        icon: Message
    }
]