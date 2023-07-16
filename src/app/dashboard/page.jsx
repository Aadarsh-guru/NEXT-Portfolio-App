'use client'
import React, { useEffect } from 'react'
import './page.css'
import { useData } from '@/context/DataProvider'
import { useRouter } from 'next/navigation'

const Dashboard = () => {

    const { user } = useData()
    const router = useRouter()

    useEffect(() => {
        if (!user?.email) {
            router.push('/login')
        }
    }, [user])

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard