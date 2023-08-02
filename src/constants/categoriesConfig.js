import { Apps, ConnectWithoutContact, Feed, LocalMovies, Psychology, Satellite, Science, Storage, Web } from "@mui/icons-material";

export const categories = [
    {
        name: 'All Blogs',
        slug: 'all-blogs',
        to: '/',
        icon: Feed
    },
    {
        name: 'Web Development',
        slug: 'web-development',
        to: '/category/web-development',
        icon: Web
    },
    {
        name: 'Database',
        slug: 'database',
        to: '/category/database',
        icon: Storage
    },
    {
        name: 'Technology',
        slug: 'technology',
        to: '/category/technology',
        icon: Satellite
    },
    {
        name: 'Science',
        slug: 'science',
        to: '/category/science',
        icon: Science
    },
    {
        name: 'App Development',
        slug: 'app-development',
        to: '/category/app-development',
        icon: Apps
    },
    {
        name: 'Entertainment',
        slug: 'entertainment',
        to: '/category/entertainment',
        icon: LocalMovies
    },
    {
        name: 'Social Media',
        slug: 'social-media',
        to: '/category/social-media',
        icon: ConnectWithoutContact
    },
    {
        name: 'Artificial Intelligence',
        slug: 'artificial-intelligence',
        to: '/category/artificial-intelligence',
        icon: Psychology
    },
]