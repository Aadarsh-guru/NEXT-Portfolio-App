'use client'
import { Clear } from '@mui/icons-material'
import { Box, Card, CardContent, Typography, styled } from '@mui/material'
import { useState } from 'react'
import AlertDialog from '../confirmBox/ConfirmDialog'
import { toast } from 'react-hot-toast'

const Component = styled(Card)(({ theme }) => ({
    boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
    margin: '10px 0px',
    padding: '0 40px'

}))

const Text = styled(Typography)(({ theme }) => ({
    fontWeight: 300,
    fontSize: '22px',
    color: '#f2f2f2',
    lineHeight: '27px',
    cursor: 'pointer'
}))


const Item = styled(Box)(({ theme }) => ({
    margin: "5px 0 0 -25px",
    [theme.breakpoints.between('sm', 'lg')]: {
        padding: '0 5px'
    },
    [theme.breakpoints.down('sm')]: {
        margin: '5px 0'
    }
}))

const Autor = styled(Typography)(({ theme }) => ({
    color: '#808290',
    fontSize: 14,
    lineHeight: '22px'
}))

const Description = styled(Typography)(({ thrme }) => ({
    lineHeight: '22px',
    color: '#bbb',
    marginTop: '5px',
    fontWeight: 300
}))

const Title = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between'
})

const DeleteButton = styled(Clear)({
    color: '#f2f2f2',
    cursor: 'pointer',
    ':hover': {
        color: 'red'
    },
    ':active': {
        color: '#44444d'
    }
})

const Article = ({ message }) => {

    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        try {
            const repponse = await fetch(`/api/contact/${message?._id}`, {
                method: 'DELETE'
            })
            const data = await repponse.json()
            if (data?.success) {
                toast.success(data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong.')
        }
    }

    return (
        <Component>
            <CardContent>
                <Item>
                    <Title><Text>{message?.email}</Text><DeleteButton onClick={() => setOpen(!open)} /></Title>
                    <Autor>
                        <b>Sent</b> by {message?.name} / {new Date(message?.createdAt).toDateString()}
                    </Autor>
                    <Description>{message?.message}</Description>
                </Item>
            </CardContent>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                title={'Are You Sure ?'}
                handleDelete={handleDelete}
                content={"Note - You want to delete this message. if you delete this you'll not be able restore this message again."} />
        </Component>
    )
}


export default Article