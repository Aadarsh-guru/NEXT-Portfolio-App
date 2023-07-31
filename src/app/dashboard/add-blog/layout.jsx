import React from 'react'
import './page.css'

export const metadata = {
    title: "Dashboard - Add Blog",
    description: "This is Add Blog Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
