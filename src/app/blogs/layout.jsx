import React from 'react'

export const metadata = {
    title: "Blog App - Blogs",
    description: "This is Blogs Page",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
