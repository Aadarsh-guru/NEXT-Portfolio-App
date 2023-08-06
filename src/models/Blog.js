import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imageKey: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'General'
    },
    meta: {
        type: String,
    },
    keywords: {
        type: String,
    },
    type: {
        type: String,
        default: 'publish'
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Blog = mongoose.models.blogs || mongoose.model('blogs', blogSchema);

export default Blog;