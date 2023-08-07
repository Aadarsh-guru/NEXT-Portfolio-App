import React from 'react'

export function generateMetadata({ params }) {
    return {
        title: `Projects - ${params?.category}`,
        description: 'This is category projects Page',
    };
}
export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}
