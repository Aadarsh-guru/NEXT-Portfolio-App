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
const bucketName = process.env.BUCKET_NAME

export const POST = async (NextRequest) => {
    try {
        const { key } = await NextRequest.json()
        const putCommand = new PutObjectCommand({ Bucket: bucketName, Key: key })
        const putPresignedUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 600 });
        const getCommand = new GetObjectCommand({ Bucket: bucketName, Key: key });
        const getPresignedUrl = await getSignedUrl(s3Client, getCommand);
        return NextResponse.json({ uploadUrl: putPresignedUrl, getUrl: getPresignedUrl, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}
