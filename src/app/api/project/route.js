import connection from '@/config/dbConfig'
import verifyToken from '@/helpers/verifyToken';
import Project from '@/models/Project';
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (NextRequest) => {
    await connection();
    try {
        const { userId, success, message } = await verifyToken(NextRequest)
        if (!success) {
            return NextResponse.json({ message: message, success: false }, { status: 200 })
        }
        const { imageUrl, title, description, category, meta, keywords, type, author, url, repoUrl } = await NextRequest.json()
        const project = await Project({ imageUrl, title, description, category, meta, keywords, type, author, userId, url, repoUrl }).save()
        return NextResponse.json({ message: 'Project Created successfully.', success: true, project }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}