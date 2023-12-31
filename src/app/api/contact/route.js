import connection from '@/config/dbConfig'
import Contact from '@/models/Contact';
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (NextRequest) => {
    await connection();
    try {
        const { name, email, message } = await NextRequest.json()
        const data = await Contact({ name, email, message }).save();
        if (!data) {
            return NextResponse.json({ message: 'something went wrong.', success: false }, { status: 200 })
        }
        return NextResponse.json({ message: 'Message sent successfully.', success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}

export const GET = async (NextRequest) => {
    await connection();
    try {
        const data = await Contact.find({}).sort({ createdAt: 'descending' })
        return NextResponse.json({ message: 'Messages fetched successfully.', success: true, messages: data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}