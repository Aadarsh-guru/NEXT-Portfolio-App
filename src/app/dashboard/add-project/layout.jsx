import React from 'react'
import './page.css'
import Theme from '@/context/ThemeProvider';

export const metadata = {
    title: "Dashboard - Add Project",
    description: "This is Add Project Dashboard Page",
};

export default function RootLayout({ children }) {
    return (
        <Theme>
            {children}
        </Theme>
    )
}
