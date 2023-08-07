'use client'
import React, { useEffect, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { toast } from 'react-hot-toast'
import Loader from '@/components/loader/Loader'
import ProjectCard from '@/components/projectCard/ProjectCard'

const Container = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    padding: 20,
    overflowY: 'auto'
}))

const CenterContainer = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const Category = ({ params }) => {

    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProjects = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/project/${params?.category}`)
                const data = await response.json()
                if (data?.success) {
                    setProjects(data?.projects)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                toast.error('something wemt wrong.')
            }
        }
        getProjects()
    }, [])


    return (
        <Container>
            {
                loading ?
                    (
                        <CenterContainer>
                            <Loader />
                        </CenterContainer>
                    )
                    :
                    (
                        projects?.length === 0 ?
                            (
                                <CenterContainer>
                                    <Typography style={{ color: '#bbb' }} >No projects to display.</Typography>
                                </CenterContainer>
                            )
                            :
                            (
                                projects?.map(project => (
                                    <ProjectCard project={project} />
                                ))
                            )
                    )
            }
        </Container>
    )
}

export default Category