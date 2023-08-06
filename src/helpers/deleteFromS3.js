import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

const deleteFromS3 = async (key) => {
    try {
        await s3Client.send(new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key
        }))
        return { success: true, message: 'Object deleted successfully.' }
    } catch (error) {
        return { success: false, message: error?.message }
    }
}

export default deleteFromS3;