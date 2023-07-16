import React from 'react'

export const metadata = {
    title: "Blog App - Portfolio",
    description: "This is Portfolio Page",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
