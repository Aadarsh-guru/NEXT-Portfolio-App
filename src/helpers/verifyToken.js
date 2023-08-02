import JWT from 'jsonwebtoken'

const verifyToken = async (request) => {
    try {
        const token = request?.cookies?.get('token')?.value
        if (!token) {
            return { message: 'Anuthorised!', success: false }
        }
        const { id } = await JWT.verify(token, process.env.JWT_SECRET)
        if (id) {
            return { userId: id, success: true }
        } else {
            return { message: 'Anuthorised!', success: false }
        }
    } catch (error) {
        return { message: error?.message, success: false }
    }
}

export default verifyToken;