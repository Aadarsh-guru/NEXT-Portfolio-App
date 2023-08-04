import React from 'react'
import './page.css'

export const metadata = {
    title: "Dashboard - Your Blogs",
    description: "This is Your Blogs Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
