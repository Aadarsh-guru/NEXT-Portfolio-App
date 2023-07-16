import { NextRequest } from 'next/server'
import JWT from 'jsonwebtoken'

export const verifyToken = (NextRequest) => {
    try {
        const token = NextRequest.cookies.get('token')?.value
        const { id } = JWT.verify(token, process.env.JWT_SECRET)
        return id
    } catch (error) {
        console.log(error);
    }
}
