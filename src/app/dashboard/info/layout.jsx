import React from 'react'
import './page.css'

export const metadata = {
    title: "Dashboard - Your Info",
    description: "This is Your Info Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
