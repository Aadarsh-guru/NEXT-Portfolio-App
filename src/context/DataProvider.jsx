'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

const DataContext = createContext(null)

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {

    const [user, setUser] = useState({ name: '', email: '', createdAt: '' })

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        if (userData) {
            setUser(userData)
        }
    }, [])

    return (
        <DataContext.Provider
            value={{
                user, setUser
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider