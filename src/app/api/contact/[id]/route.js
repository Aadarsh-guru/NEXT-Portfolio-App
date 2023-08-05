import connection from '@/config/dbConfig'
import Contact from '@/models/Contact';
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (NextRequest, { params }) => {
    await connection();
    try {
        const message = await Contact.findByIdAndDelete(params?.id)
        if (!message) {
            return NextResponse.json({ message: 'something went wrong.', success: false }, { status: 200 })
        }
        return NextResponse.json({ message: 'Message Deleted successfully.', success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}