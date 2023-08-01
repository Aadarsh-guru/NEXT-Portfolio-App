import { BusinessCenter, ConnectWithoutContact, Feed, HowToVote, LocalMovies, Psychology, Satellite, Science, Sports } from "@mui/icons-material";

export const categories = [
    {
        name: 'All News',
        slug: 'all-news',
        to: '/',
        icon: Feed
    },
    {
        name: 'Bussines',
        slug: 'bussiness',
        to: '/category/bussiness',
        icon: BusinessCenter
    },
    {
        name: 'Sports',
        slug: 'sports',
        to: '/category/sports',
        icon: Sports
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
        name: 'Politics',
        slug: 'politics',
        to: '/category/politics',
        icon: HowToVote
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
        name: 'Psychology',
        slug: 'psychology',
        to: '/category/psychology',
        icon: Psychology
    },
]