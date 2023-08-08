import connection from '@/config/dbConfig';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async (NextRequest) => {
    await connection();
    try {
        const { name, email, password } = await NextRequest.json()
        const admin = await User.findOne({})
        if (admin) {
            return NextResponse.json({ message: 'Admin already registered.', success: false }, { status: 200 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await User({ name, email, password: hashedPassword }).save();
        if (!data) {
            return NextResponse.json({ message: 'something went wrong.', success: false }, { status: 200 })
        }
        return NextResponse.json({ message: 'User registered successfully.', success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}