import getPresignedUrl from '@/helpers/getPresignedUrl'
import { Box, Card, CardContent, Grid, Typography, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { memo, useEffect, useState } from 'react'

const ImageComponent = styled(Image)(({ theme }) => ({
    height: '268px',
    width: '88%',
    objectFit: 'cover',
    borderRadius: 5,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}))

const Component = styled(Card)(({ theme }) => ({
    boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
    marginBottom: 20
}))

const Container = styled(CardContent)(({ theme }) => ({
    padding: '8px',
    paddingBottom: '4px !important'
}))


const RightContainer = styled(Grid)(({ theme }) => ({
    margin: "5px 0 0 -25px",
    [theme.breakpoints.between('sm', 'lg')]: {
        padding: '0 5px'
    },
    [theme.breakpoints.down('sm')]: {
        margin: '5px 0'
    }
}))

const Autor = styled(Typography)(({ theme }) => ({
    color: '#808290',
    fontSize: 12,
    lineHeight: '22px'
}))

const ReadMore = styled(Typography)(({ theme }) => ({
    fontSize: 12,
    marginTop: 10,
    color: '',
    fontWeight: 'bold',
    cursor: 'pointer',
    ':hover': {
        color: 'grey'
    },

}))

const Text = styled(Typography)(({ theme }) => ({
    fontWeight: 300,
    fontSize: '22px',
    color: '#f2f2f2',
    lineHeight: '27px',
    cursor: 'pointer'
}))

const Description = styled(Typography)(({ thrme }) => ({
    lineHeight: '22px',
    color: '#bbb',
    marginTop: '5px',
    fontWeight: 300
}))

const Article = ({ project }) => {

    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const getUrls = async () => {
            try {
                const image = await getPresignedUrl(project?.image)
                if (image?.success) {
                    setImageUrl(image?.url)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUrls()
    }, [])

    return (
        <Component>
            <Container >
                <Grid container>
                    <Grid lg={5} sm={5} xs={12} item>
                        {
                            imageUrl && <Link href={project?.url ? project?.url : '/projects'} target='_blank' > <ImageComponent height={268} width={268} src={imageUrl} alt='the related to project pic' /></Link>
                        }
                    </Grid>
                    <RightContainer lg={7} md={7} sm={7} xs={12} item>
                        <Link href={project?.repoUrl && project?.repoUrl} target='_blank' ><Text>{project?.title?.slice(0, 100) + '...'}</Text></Link>
                        <Autor>
                            <b>Made</b> by {project?.author} / {new Date(project?.createdAt).toDateString()}
                        </Autor>
                        <Description>{project?.description?.slice(0, 350) + '...'}</Description>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }} >
                            {
                                project?.url && <Link href={project?.url} target='_blank' > <ReadMore>Visit Project</ReadMore></Link>
                            }
                            {
                                project?.repoUrl && <Link href={project?.repoUrl} target='_blank' ><ReadMore>View Source Code</ReadMore></Link>
                            }
                        </Box>
                    </RightContainer>
                </Grid>
            </Container>
        </Component>
    )
}

export default memo(Article)