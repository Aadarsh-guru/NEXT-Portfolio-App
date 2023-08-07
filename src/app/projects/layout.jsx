import React from 'react'
import Sidebar from '@/components/sidebar/Sidebar'
import './page.css'
import { projectCategories } from '@/constants/categoriesConfig';

export const metadata = {
    title: "Aadarsh Guru - Projects",
    description: "This is Projects Page",
};

export default function RootLayout({ children }) {
    return (
        <div className='layout'>
            <Sidebar sidebarData={projectCategories} />
            <div className="content">
                {children}
            </div>
        </div>
    )
}
