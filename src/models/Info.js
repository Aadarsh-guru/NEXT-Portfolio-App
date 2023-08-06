import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    subHeading: {
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
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String,
        required: true,
    },
    resumeKey: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Info = mongoose.models.info || mongoose.model('info', infoSchema);

export default Info;