import React from 'react'

export const metadata = {
    title: "Blog App - Dashboard",
    description: "This is Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
