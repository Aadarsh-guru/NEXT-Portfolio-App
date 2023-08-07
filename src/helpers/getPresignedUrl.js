
const getPresignedUrl = async (key) => {
    try {
        const response = await fetch('/api/upload/', {
            method: 'PUT',
            body: JSON.stringify({ key: key })
        })
        if (response?.status === 200) {
            const data = await response.json()
            return { success: true, url: data?.getUrl }
        }
    } catch (error) {
        return { message: error?.message, success: false }
    }
}

export default getPresignedUrl