import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
    category: {
        type: String,
        default: 'General'
    },
    meta: {
        type: String,
    },
    url: {
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

const Project = mongoose.models.projects || mongoose.model('projects', projectSchema);

export default Project;