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
        const { title, description, category, author, url, repoUrl, image } = await NextRequest.json()
        const project = await Project({ image, title, description, category, author, url, repoUrl }).save()
        return NextResponse.json({ message: 'Project Created successfully.', success: true, project }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}

export const GET = async (NextRequest) => {
    await connection();
    try {
        const data = await Project.find({}).sort({ updatedAt: 'descending' })
        return NextResponse.json({ message: 'Projects fetched successfully.', success: true, projects: data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}


export const PUT = async (NextRequest) => {
    await connection();
    try {
        const { success, message } = await verifyToken(NextRequest)
        if (!success) {
            return NextResponse.json({ message: message, success: false }, { status: 200 })
        }
        const { title, id } = await NextRequest.json()
        const project = await Project.findByIdAndUpdate(id, { title })
        return NextResponse.json({ message: 'Project moved on ton successfully.', success: true, project }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}