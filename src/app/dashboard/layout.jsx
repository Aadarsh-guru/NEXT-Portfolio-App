import React from 'react'
import Sidebar from '@/components/sidebar/Sidebar'
import './page.css'

export const metadata = {
    title: "Blog App - Dashboard",
    description: "This is Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <div className='layout'>
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    )
}
