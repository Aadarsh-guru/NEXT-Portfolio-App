

const uploadToS3 = async (file, ref) => {
    try {
        const uploadResponse = await fetch('/api/upload/', {
            method: 'POST',
            body: JSON.stringify({ key: `next-blog-app/${ref}/${Date.now()}.${file?.name}` })
        })
        if (uploadResponse?.status === 200) {
            const uploadData = await uploadResponse.json()
            const uploaded = await fetch(uploadData?.uploadUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file?.type
                }
            })
            if (uploaded?.status === 200) {
                return { imageUrl: uploadData?.getUrl, success: true }
            }
        }
    } catch (error) {
        return { message: error?.message, success: false }
    }
}

export default uploadToS3