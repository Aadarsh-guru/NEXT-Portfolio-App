import React from 'react'
import './page.css'

export const metadata = {
    title: "Dashboard - Your Projects",
    description: "This is Your Projects Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
