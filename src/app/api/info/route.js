import connection from '@/config/dbConfig'
import verifyToken from '@/helpers/verifyToken';
import Info from '@/models/Info';
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

export const POST = async (NextRequest) => {
    await connection();
    try {
        const { userId, success, message } = await verifyToken(NextRequest)
        if (!success) {
            return NextResponse.json({ message: message, success: false }, { status: 200 })
        }
        const { image, heading, subHeading, description, email, phone, resume } = await NextRequest.json()
        const data = await Info.findOne({})
        if (data?._id) {
            await s3Client.send(new DeleteObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: data?.image
            }))
            await s3Client.send(new DeleteObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: data?.resume
            }))
            const info = await Info.findByIdAndUpdate(data?._id, { image, heading, subHeading, description, email, phone, resume, userId })
            return NextResponse.json({ message: 'Info Updated successfully.', success: true, info }, { status: 201 })
        } else {
            await Info.deleteOne({})
            const info = await Info({ image, heading, subHeading, description, email, phone, resume, userId }).save()
            return NextResponse.json({ message: 'Info Updated successfully.', success: true, info }, { status: 201 })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}


export const GET = async (NextRequest) => {
    await connection();
    try {
        const info = await Info.findOne({})
        return NextResponse.json({ message: 'Info fetched successfully.', success: true, info }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}