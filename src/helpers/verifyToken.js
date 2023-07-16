import JWT from 'jsonwebtoken'

export const verifyToken = (request) => {
    try {
        const token = request.cookies.get('token')?.value
        const { id } = JWT.verify(token, process.env.JWT_SECRET)
        return id
    } catch (error) {
        console.log(error);
    }
}
