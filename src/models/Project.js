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
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    meta: {
        type: String,
    },
    url: {
        type: String,
    },
    repoUrl: {
        type: String,
    },
    keywords: {
        type: String,
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Project = mongoose.models.projects || mongoose.model('projects', projectSchema);

export default Project;