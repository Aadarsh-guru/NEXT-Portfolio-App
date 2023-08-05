import React from 'react'
import './page.css'

export const metadata = {
    title: "Dashboard - Your Messages",
    description: "This is Your Messages Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
