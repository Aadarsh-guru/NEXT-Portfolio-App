import connection from '@/config/dbConfig'
import verifyToken from '@/helpers/verifyToken';
import Project from '@/models/Project';
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

export const DELETE = async (NextRequest, { params }) => {
    await connection();
    try {
        const { success, message } = await verifyToken(NextRequest)
        if (!success) {
            return NextResponse.json({ message: message, success: false }, { status: 200 })
        }
        const project = await Project.findById(params?.id)
        if (project?._id) {
            await s3Client.send(new DeleteObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: project?.image
            }))
            await Project.findByIdAndDelete(project?._id)
            return NextResponse.json({ message: 'Project Deleted successfully.', success: true }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'something weng wrong.', success: false }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}