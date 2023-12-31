import { NextResponse } from 'next/server'

export const POST = async () => {
    try {
        const response = NextResponse.json({ message: 'logout successfully.', success: true }, { status: 200 })
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
        return response;
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}