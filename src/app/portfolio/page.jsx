'use client'
import Image from 'next/image';
import { Box, Button, Typography, styled } from "@mui/material";
import { Email, GitHub, Instagram, LinkedIn, Phone, Twitter, YouTube } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from '@/components/loader/Loader';
import getPresignedUrl from '@/helpers/getPresignedUrl';

const Container = styled(Box)({
    display: 'flex',
    height: 'calc(100vh - 150px)',
    alignItems: 'center',
    gap: 10
})

const Section = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
})

const MyImage = styled(Image)({
    height: '500px',
    width: '500px',
    margin: '0 auto',
    borderRadius: '50%'
})

const Heading = styled(Typography)({
    fontSize: 32,
})

const SubHeading = styled(Typography)({
    fontSize: 18,
    color: '#bbb'
})

const Description = styled(Typography)({
    fontSize: 15,
    marginTop: 20,
    color: '#bbb'
})

const ContactBox = styled(Box)({
    height: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
})

const ConnectWithMe = styled(Box)({
    height: 30,
    marginTop: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#bbb',
    '& > p': {
        fontSize: 18
    }
})

const MyEmail = styled(Box)({
    width: '100%',
    display: 'flex',
    gap: 10,
    color: '#bbb'
})

const MyPhone = styled(Box)({
    width: '100%',
    display: 'flex',
    gap: 10,
    color: '#bbb'
})

const IconsBox = styled(Box)({
    height: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    color: '#bbb',
    '& > a > svg': {
        transition: 'all 0.25s ease',
        ':hover': {
            color: '#53c28b',
            transform: 'scale(1.2)',
        },
    },
})

const ActionBox = styled(Box)({
    height: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 50,
})

const CenterContainer = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const Portfolio = () => {

    const [infoData, setInfoData] = useState({})
    const [fetching, setFetching] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [resumeUrl, setResumeUrl] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetching(true)
                const response = await fetch('/api/info')
                const data = await response.json()
                if (data?.success) {
                    setInfoData(data?.info)
                }
            } catch (error) {
                console.log(error);
                toast.error('something went wrong.')
            } finally {
                setFetching(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const getUrls = async () => {
            try {
                const resume = await getPresignedUrl(infoData?.resume)
                if (resume?.success) {
                    setResumeUrl(resume?.url)
                }
                const image = await getPresignedUrl(infoData?.image)
                if (image?.success) {
                    setImageUrl(image?.url)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUrls()
    }, [infoData])


    return (
        <Container>
            {
                fetching ?
                    (
                        <CenterContainer>
                            <Loader />
                        </CenterContainer>
                    )
                    :
                    (
                        <>
                            <Section>
                                <Heading>{infoData?.heading}</Heading>
                                <SubHeading>
                                    {infoData?.subHeading}
                                </SubHeading>
                                <Description>
                                    {infoData?.description}
                                </Description>
                                <ConnectWithMe>
                                    <Typography>Connect With Me -</Typography>
                                </ConnectWithMe>
                                <ContactBox>
                                    <MyEmail>
                                        <Email />
                                        <Typography>{infoData?.email}</Typography>
                                    </MyEmail>
                                    <MyPhone>
                                        <Phone />
                                        <Typography>{infoData?.phone}</Typography>
                                    </MyPhone>
                                </ContactBox>
                                <IconsBox>
                                    <a href='https://www.linkedin.com/in/aadarsh-guru/' target='_blank' ><LinkedIn /></a>
                                    <a href='https://twitter.com/Aadarsh_guru' target='_blank' ><Twitter /></a>
                                    <a href='https://instagram.com/aadarsh_guru' target='_blank' ><Instagram /></a>
                                    <a href='https://github.com/aadarsh-guru' target='_blank' > <GitHub /></a>
                                    <a href='https://youtube.com/@Aadarshguru' target='_blank' ><YouTube /></a>
                                </IconsBox>
                                <ActionBox>
                                    <Link href='/projects' ><Button style={{
                                        background: '#53c28b',
                                    }} variant='contained' >
                                        See My Projects
                                    </Button></Link>
                                    <a href={resumeUrl ? resumeUrl : '/'} target='_blank' >
                                        <Button
                                            style={{
                                                color: '#53c28b',
                                            }} >
                                            See My Resume
                                        </Button>
                                    </a>
                                </ActionBox>
                            </Section>
                            <Section>
                                {
                                    imageUrl && <MyImage width={500} height={500} src={imageUrl} alt="portfolio-image" />
                                }
                            </Section>
                        </>
                    )
            }
        </Container>
    )
}

export default Portfolio