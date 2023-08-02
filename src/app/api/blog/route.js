import connection from '@/config/dbConfig'
import verifyToken from '@/helpers/verifyToken';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (NextRequest) => {
    await connection();
    try {
        const { userId, success, message } = await verifyToken(NextRequest)
        if (!success) {
            return NextResponse.json({ message: message, success: false }, { status: 200 })
        }
        const { imageUrl, title, description, category, meta, keywords, type, author } = await NextRequest.json()
        const blog = await Blog({ imageUrl, title, description, category, meta, keywords, type, author, userId }).save()
        return NextResponse.json({ message: 'Blog Created successfully.', success: true, blog }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}