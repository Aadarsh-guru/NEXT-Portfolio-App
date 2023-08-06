import connection from '@/config/dbConfig'
import verifyToken from '@/helpers/verifyToken';
import Info from '@/models/Info';
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (NextRequest) => {
    await connection();
    try {
        const { userId, success, message } = await verifyToken(NextRequest)
        if (!success) {
            return NextResponse.json({ message: message, success: false }, { status: 200 })
        }
        const { imageUrl, imageKey, heading, subHeading, description, email, phone, resumeUrl, resumeKey } = await NextRequest.json()
        const data = await Info.findOne({})
        if (data?._id) {
            const info = await Info.findByIdAndUpdate(data?._id, { imageUrl, imageKey, heading, subHeading, description, email, phone, resumeUrl, resumeKey, userId })
            return NextResponse.json({ message: 'Info Updated successfully.', success: true, info }, { status: 201 })
        } else {
            await Info.deleteOne({})
            const info = await Info({ imageUrl, imageKey, heading, subHeading, description, email, phone, resumeUrl, resumeKey, userId }).save()
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