import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const response = NextResponse.json({ message: 'logout successfully.', success: true }, { status: 200 })
        response.cookies.delete('token')
        return response;
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}