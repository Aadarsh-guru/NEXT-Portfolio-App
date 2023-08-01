import { AddCard, Dashboard, Drafts, DynamicFeed, Feed, ListAlt, Message, PostAdd, RestoreFromTrash } from "@mui/icons-material";

export const sidebarData = [
    {
        id: 1,
        title: "Home",
        url: "/dashboard",
        icon: Dashboard
    },
    {
        id: 2,
        title: "Add new blog",
        url: "/dashboard/add-blog",
        icon: PostAdd
    },
    {
        id: 3,
        title: "Add new project",
        url: "/dashboard/add-project",
        icon: AddCard
    },
    {
        id: 4,
        title: "Your Blogs",
        url: "/dashboard/blogs",
        icon: DynamicFeed
    },
    {
        id: 5,
        title: "Your Projects",
        url: "/dashboard/projects",
        icon: ListAlt
    },
    {
        id: 6,
        title: "Your Info",
        url: "/dashboard/info",
        icon: Feed
    },
    {
        id: 7,
        title: "Messages",
        url: "/dashboard/messages",
        icon: Message
    },
    {
        id: 8,
        title: "Your Drafts",
        url: "/dashboard/draft",
        icon: Drafts
    },
    {
        id: 9,
        title: "Trash Bin",
        url: "/dashboard/bin",
        icon: RestoreFromTrash
    },
]