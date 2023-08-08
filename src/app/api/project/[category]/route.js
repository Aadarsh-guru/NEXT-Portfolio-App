import connection from '@/config/dbConfig'
import Project from '@/models/Project';
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (NextRequest, { params }) => {
    await connection();
    try {
        const data = await Project.find({ category: params?.category }).sort({ updatedAt: 'descending' })
        return NextResponse.json({ message: 'Projects fetched successfully.', success: true, projects: data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}