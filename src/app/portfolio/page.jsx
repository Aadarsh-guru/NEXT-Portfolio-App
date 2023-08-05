'use client'
import ImageURL from "public/my-image.png";
import Image from 'next/image';
import { Box, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: 'calc(100vh - 150px)',
    alignItems: 'center',
    gap: 10
}))

const Section = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}))

const MyImage = styled(Image)(({ theme }) => ({
    height: '500px',
    width: '500px',
    margin: '0 auto',
    borderRadius: '50%'
}))

const Portfolio = () => {
    return (
        <Container>
            <Section>

            </Section>
            <Section>
                <MyImage src={ImageURL} alt="portfolio-image" />
            </Section>
        </Container>
    )
}

export default Portfolio