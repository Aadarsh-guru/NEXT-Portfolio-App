'use client'
import { Box, Button, MenuItem, TextField, Typography, styled } from '@mui/material'
import { Upload } from '@mui/icons-material'
import { useState, memo } from 'react'
import toast from 'react-hot-toast'
import { useData } from '@/context/DataProvider'
import { projectCategories } from '@/constants/categoriesConfig'
import './page.css'
import { useRouter } from 'next/navigation'
import uploadToS3 from '@/helpers/uploadToS3'

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

const ActionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 25,
    margin: 15,
    justifyContent: 'space-between',
    '&>button': {
        width: '100%',
        padding: 10
    }
}))

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

function AddProject() {

    const router = useRouter()
    const { user } = useData()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [url, setUrl] = useState('')
    const [repoUrl, setRepoUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!image) {
                return toast.error('Image is Required.')
            }
            if (!image?.type?.includes('image')) {
                return toast.error('Image files only accepted.')
            }
            setLoading(true)
            const { success, key } = await uploadToS3(image, 'project-images')
            if (!success) {
                return toast.error('something went wrong.')
            }
            const response = await fetch('/api/project', {
                method: 'POST',
                body: JSON.stringify({ image: key, title, description, category, url, repoUrl, author: user?.name })
            })
            response && setLoading(false)
            const data = await response.json()
            if (response.status === 201) {
                toast.success(data?.message)
                router.push('/dashboard/projects')
            } else {
                toast.success(data?.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error('something went wrong.')
        }
    }

    return (
        <Container>
            <Heading>Create Project</Heading>
            <Form onSubmit={(e) => handleSubmit(e)} >
                <label style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} htmlFor="file">
                    <SelectImage>
                        <Upload fontSize='medium' />
                        <Typography>Select Image</Typography>
                    </SelectImage>
                </label>
                <ImageBox>
                    {
                        image && !image?.type.includes('image') && <Typography style={{ fontSize: 14, color: 'red', }} >Only Images Allowed.</Typography>
                    }
                    {
                        image && image?.type.includes('image') && <img src={URL.createObjectURL(image)} alt='' />
                    }
                </ImageBox>
                <TextField onChange={(e) => setImage(e.target.files[0])} sx={{ display: 'none' }} id='file' type='file' />
                <TextField disabled={loading && true} value={category} error={category && category?.length < 3 && true} required onChange={(e) => setCategory(e.target.value)} label={'Select Category'} select >
                    {
                        projectCategories?.filter(cate => cate.title !== 'All Projects').map(category => (
                            <MenuItem value={category.slug} key={category.id} >{category.title}</MenuItem>
                        ))
                    }
                </TextField>
                <TextField disabled={loading && true} placeholder='Title max should be 100 characters long' error={title && title?.length < 3 && true} onChange={(e) => setTitle(e.target.value)} required label='Enter Project Title' />
                <TextField disabled={loading && true} placeholder='Description max should be 350 characters long' error={description && description?.length < 3 && true} required onChange={(e) => setDescription(e.target.value)} label='Enter Project Description' multiline minRows={10} />
                <TextField disabled={loading && true} placeholder='This must be type url.' type='url' onChange={(e) => setRepoUrl(e.target.value)} label='Enter Project Repository URL' required />
                <TextField disabled={loading && true} placeholder='This must be type url.' type='url' onChange={(e) => setUrl(e.target.value)} label='Enter Project URL' />
                <ActionBox>
                    <Button disabled={loading && true} type='submit' variant='contained' >{loading ? 'Publishing..' : 'Publish Now'}</Button>
                </ActionBox>
            </Form>
        </Container>
    )
}

export default memo(AddProject)