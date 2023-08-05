'use client'
import React, { useState } from 'react'
import './page.css'
import { Box, styled } from '@mui/material'
import Message from '@/components/message/Message'

const Container = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
}))

const Messages = () => {

    return (
        <Container>
            <Message />
        </Container>
    )
}

export default Messages