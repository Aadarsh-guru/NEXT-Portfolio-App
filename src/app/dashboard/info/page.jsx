'use client'
import { Box, Button, TextField, Typography, styled } from '@mui/material'
import { Upload } from '@mui/icons-material'
import { useState, memo, useEffect } from 'react'
import toast from 'react-hot-toast'
import './page.css'
import { useRouter } from 'next/navigation'
import uploadToS3 from '@/helpers/uploadToS3'
import Loader from '@/components/loader/Loader'

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    overflowY: 'auto',
}))

const Heading = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600,
    color: '#bbb',
    margin: 20,
    [theme.breakpoints.down('md')]: {
        margin: 10
    }
}))

const Form = styled('form')(({ theme }) => ({
    margin: '25px 0 0 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    '& > div': {
        width: '90%',
    }
}))

const SelectImage = styled(Box)(({ theme }) => ({
    width: '90%',
    padding: 15,
    border: '1px solid grey',
    borderRadius: 5,
    cursor: 'pointer',
    textAlign: 'center',
    color: 'gray',
    transition: 'all 0.25s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
        background: 'lightgray'
    },
    ':active': {
        background: '#f2f2f2'
    },
    [theme.breakpoints.down('md')]: {
        fontSize: 16
    },
    '&>svg': {
        margin: '0 5px 0 0'
    }
}))


const ActionBox = styled(Box)({
    display: 'flex',
    gap: 25,
    margin: 15,
    justifyContent: 'space-between',
    '&>button': {
        width: '100%',
        padding: 10
    }
})

const ImageBox = styled(Box)(({ theme }) => ({
    width: '100%',
    transition: 'all 2.5s ease-out',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '& > img': {
        height: '268px',
        maxWidth: '100%',
        objectFit: 'cover',
        borderRadius: 5,
    }
}))

const CenterContainer = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

function AddProject() {

    const router = useRouter()
    const [image, setImage] = useState('')
    const [heading, setHeading] = useState('')
    const [subHeading, setSubHeading] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [resume, setResume] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!image) {
                return toast.error('Image is required..')
            }
            if (!image?.type?.includes('image')) {
                return toast.error('Image files only accepted.')
            }
            if (!resume) {
                return toast.error('Resume is required.')
            }
            if (!resume?.type?.includes('application')) {
                return toast.error('Doc files only accepted.')
            }
            setLoading(true)
            const { imageUrl, success, imageKey } = await uploadToS3(image, 'profile-images')
            const resumeData = await uploadToS3(resume, 'info-resume')
            if (!success) {
                return toast.error('something went wrong.')
            }
            if (!resumeData?.success) {
                return toast.error('something went wrong.')
            }
            const response = await fetch('/api/info', {
                method: 'POST',
                body: JSON.stringify({ imageUrl, imageKey, heading, subHeading, description, email, phone, resumeUrl: resumeData?.imageUrl, resumeKey: resumeData?.imageKey })
            })
            response && setLoading(false)
            const data = await response.json()
            if (response.status === 201) {
                toast.success(data?.message)
                router.push('/portfolio')
            } else {
                toast.success(data?.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error('something went wrong.')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetching(true)
                const response = await fetch('/api/info')
                const data = await response.json()
                if (data?.success) {
                    setHeading(data?.info?.heading)
                    setSubHeading(data?.info?.subHeading)
                    setDescription(data?.info?.description)
                    setEmail(data?.info?.email)
                    setPhone(data?.info?.phone)
                }
            } catch (error) {
                console.log(error);
                toast.error('something went wrong.')
            } finally {
                setFetching(false)
            }
        }
        fetchData()
    }, [])

    return (
        <Container>
            {
                fetching ?
                    (
                        <CenterContainer>
                            <Loader />
                        </CenterContainer>
                    )
                    :
                    (
                        <>
                            <Heading>Your info</Heading>
                            <Form onSubmit={(e) => handleSubmit(e)} >
                                <label style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} htmlFor="file">
                                    <SelectImage>
                                        <Upload fontSize='medium' />
                                        <Typography>Select Your Image</Typography>
                                    </SelectImage>
                                </label>
                                <ImageBox>
                                    {
                                        image && !image?.type?.includes('image') && <Typography style={{ fontSize: 14, color: 'red', }} >Only Images Allowed.</Typography>
                                    }
                                    {
                                        image && image?.type?.includes('image') && <img src={URL.createObjectURL(image)} alt='' />
                                    }
                                </ImageBox>
                                <TextField onChange={(e) => setImage(e.target.files[0])} sx={{ display: 'none' }} id='file' type='file' />
                                <TextField value={heading} disabled={loading && true} onChange={(e) => setHeading(e.target.value)} required label='Enter Info Heading' />
                                <TextField value={subHeading} disabled={loading && true} onChange={(e) => setSubHeading(e.target.value)} required label='Enter Info Sub Heading' />
                                <TextField value={description} disabled={loading && true} required onChange={(e) => setDescription(e.target.value)} label='Enter Info Description' multiline minRows={10} />
                                <TextField value={email} disabled={loading && true} onChange={(e) => setEmail(e.target.value)} required label='Enter Info Email' />
                                <TextField value={phone} disabled={loading && true} onChange={(e) => setPhone(e.target.value)} required label='Enter Info Phone' />
                                <TextField onChange={(e) => setResume(e.target.files[0])} sx={{ display: 'none' }} id='resume' type='file' />
                                <label style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} htmlFor="resume">
                                    <SelectImage>
                                        <Upload fontSize='medium' />
                                        <Typography>{resume ? resume?.name : 'Select Your Resume'}</Typography>
                                    </SelectImage>
                                </label>
                                <ImageBox>
                                    {
                                        resume && !resume?.type?.includes('application') && <Typography style={{ fontSize: 14, color: 'red', }} >Only Doc files Allowed.</Typography>
                                    }
                                </ImageBox>
                                <ActionBox>
                                    <Button disabled={loading && true} type='submit' variant='contained' >{loading ? 'Updating..' : 'Update Now'}</Button>
                                </ActionBox>
                            </Form>
                        </>
                    )
            }
        </Container >
    )
}

export default memo(AddProject)