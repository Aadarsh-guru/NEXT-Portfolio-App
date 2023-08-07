import connection from '@/config/dbConfig'
import verifyToken from '@/helpers/verifyToken';
import Project from '@/models/Project';
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (NextRequest) => {
    await connection();
    try {
        const { success, message } = await verifyToken(NextRequest)
        if (!success) {
            return NextResponse.json({ message: message, success: false }, { status: 200 })
        }
        const { title, description, category, meta, keywords, type, author, url, repoUrl, image } = await NextRequest.json()
        const project = await Project({ image, title, description, category, meta, keywords, type, author, url, repoUrl }).save()
        return NextResponse.json({ message: 'Project Created successfully.', success: true, project }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}