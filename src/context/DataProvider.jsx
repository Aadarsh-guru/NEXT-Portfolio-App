'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

const DataContext = createContext(null)

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {

    const [user, setUser] = useState({ name: '', email: '', createdAt: '' })
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        if (userData) {
            setUser(userData)
        }
    }, [])

    return (
        <DataContext.Provider
            value={{
                user, setUser,
                theme, setTheme
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider