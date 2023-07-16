import connection from '@/config/dbConfig';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

export const POST = async (NextRequest) => {
    await connection();
    try {
        const { email, password } = await NextRequest.json()
        const user = await User.findOne({ email: email })
        if (!user) {
            return NextResponse.json({ message: 'invalid login credentials.', success: false }, { status: 200 })
        }
        const match = await bcrypt.compare(password, user?.password)
        if (!match) {
            return NextResponse.json({ message: 'invalid login credentials.', success: false }, { status: 200 })
        }
        const token = JWT.sign({ id: user?._id }, process.env.JWT_SECRET)
        const data = { name: user?.name, email: user?.email, createdAt: user?.createdAt, id: user?._id }
        const response = NextResponse.json({ message: 'Logged in successfully.', success: true, user: data }, { status: 200 })
        response.cookies.set('token', token, { httpOnly: true })
        return response;
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
} 