'use client'
import React, { useEffect, useState } from 'react'
import './page.css'
import { Box, Typography, styled } from '@mui/material'
import Message from '@/components/message/Message'
import { toast } from 'react-hot-toast'
import Loader from '@/components/loader/Loader'

const Container = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    padding: 20,
    overflowY: 'auto'
}))

const CenterContainer = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const Messages = () => {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/contact')
                const data = await response.json()
                if (data?.success) {
                    setMessages(data?.messages)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                toast.error('something wemt wrong.')
            }
        }
        getMessages()
    }, [])

    return (
        <Container>
            {
                loading ?
                    (
                        <CenterContainer>
                            <Loader />
                        </CenterContainer>
                    )
                    :
                    (
                        messages?.length === 0 ?
                            (
                                <CenterContainer>
                                    <Typography style={{ color: '#bbb' }} >No messages to display.</Typography>
                                </CenterContainer>
                            )
                            :
                            (
                                messages?.map(message => (
                                    <Message key={message?._id} message={message} />
                                ))
                            )
                    )
            }
        </Container>
    )
}

export default Messages