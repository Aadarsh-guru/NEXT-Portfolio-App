import { AddCard, Dashboard, DynamicFeed, Feed, ListAlt, Message, PostAdd } from "@mui/icons-material";

export const sidebarData = [
    {
        id: 1,
        title: "Home",
        url: "/dashboard",
        icon: Dashboard
    },
    {
        id: 9,
        title: "Add new blog",
        url: "/dashboard/add-blog",
        icon: PostAdd
    },
    {
        id: 5,
        title: "Add new project",
        url: "/dashboard/add-project",
        icon: AddCard
    },
    {
        id: 2,
        title: "Your Blogs",
        url: "/dashboard/blogs",
        icon: DynamicFeed
    },
    {
        id: 3,
        title: "Your Projects",
        url: "/dashboard/projects",
        icon: ListAlt
    },
    {
        id: 7,
        title: "Your Info",
        url: "/dashboard/info",
        icon: Feed
    },
    {
        id: 6,
        title: "Messages",
        url: "/dashboard/messages",
        icon: Message
    },
]