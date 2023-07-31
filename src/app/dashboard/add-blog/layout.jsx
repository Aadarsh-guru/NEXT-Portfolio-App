import React from 'react'
import './page.css'
import Theme from '@/context/ThemeProvider';

export const metadata = {
    title: "Dashboard - Add Blog",
    description: "This is Add Blog Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <Theme>
            {children}
        </Theme>
    )
}
