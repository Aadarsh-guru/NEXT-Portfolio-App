import imageCompression from "browser-image-compression"

const uploadToS3 = async (file, ref) => {
    try {
        const key = `next-blog-app/${ref}/${Date.now()}.${file?.name}`
        const uploadResponse = await fetch('/api/upload/', {
            method: 'POST',
            body: JSON.stringify({ key: key })
        })
        if (file?.type?.includes('image')) {
            const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
            if (uploadResponse?.status === 200) {
                const uploadData = await uploadResponse.json()
                const uploaded = await fetch(uploadData?.uploadUrl, {
                    method: 'PUT',
                    body: compressedFile,
                    headers: {
                        'Content-Type': file?.type
                    }
                })
                if (uploaded?.status === 200) {
                    return { imageUrl: uploadData?.getUrl, success: true, imageKey: key }
                }
            }
        } else {
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
                    return { imageUrl: uploadData?.getUrl, success: true, imageKey: key }
                }
            }
        }
    } catch (error) {
        return { message: error?.message, success: false }
    }
}

export default uploadToS3