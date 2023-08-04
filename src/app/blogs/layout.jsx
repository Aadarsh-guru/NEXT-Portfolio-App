import React from 'react'
import Sidebar from '@/components/sidebar/Sidebar'
import './page.css'
import { categories } from '@/constants/categoriesConfig';

export const metadata = {
    title: "Blog App - Blogs",
    description: "This is Blogs Page",
};

export default function RootLayout({ children }) {
    return (
        <div className='layout'>
            <Sidebar sidebarData={categories} />
            <div className="content">
                {children}
            </div>
        </div>
    )
}
