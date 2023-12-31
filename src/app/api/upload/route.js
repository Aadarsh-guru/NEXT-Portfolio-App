import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

export const POST = async (NextRequest) => {
    try {
        const { key } = await NextRequest.json()
        const putCommand = new PutObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key })
        const putPresignedUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 600 });
        return NextResponse.json({ uploadUrl: putPresignedUrl, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}


export const PUT = async (NextRequest) => {
    try {
        const { key } = await NextRequest.json()
        const getCommand = new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key });
        const getPresignedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 600 });
        return NextResponse.json({ getUrl: getPresignedUrl, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}