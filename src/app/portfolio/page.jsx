'use client'
import ImageURL from "public/my-image.png";
import Image from 'next/image';
import { Box, Button, Typography, styled } from "@mui/material";
import { Email, GitHub, Instagram, LinkedIn, Phone, Twitter, YouTube } from "@mui/icons-material";
import Link from "next/link";
import './page.css'

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

const Portfolio = () => {
    return (
        <Container>
            <Section>
                <Heading>Hey! I'm Aaadarsh Guru</Heading>
                <SubHeading>
                    A man with extraordinary desire to learn new things who often becomes a writer whenever alone. and also a MERN stack Developer.
                </SubHeading>
                <Description>
                    I am a hustler who always ready to learn new thing, in order to sharpen my saw everyday i prefer reding books and I also love to share with people all the knowledge I have gained till now, it helps me to keep my vision present in my mind.
                    In order to become a contributor I write blogs based on the things I'm learning, I'm a enthusiast programer and a MERN-stack developer, learning and creating tech is one of the thing which really excites me, along with tech I'm learning interpersonal skills and also keep interest in psychology and intellectual things.
                    I have strong believe that the only thing which makes human being shine is right education so to add value in their lives I make efforts to make people aware about tech and encourage people to get educated.
                    Whenever I get free time I usually spend my time with nature other than this I love to talk to my own self, and write tweets too.
                </Description>
                <ConnectWithMe>
                    <Typography>Connect With Me -</Typography>
                </ConnectWithMe>
                <ContactBox>
                    <MyEmail>
                        <Email />
                        <Typography>aadarshgurug@gmail.com</Typography>
                    </MyEmail>
                    <MyPhone>
                        <Phone />
                        <Typography>+91 8871760855</Typography>
                    </MyPhone>
                </ContactBox>
                <IconsBox>
                    <a href='#' target='_blank' ><LinkedIn /></a>
                    <a href='#' target='_blank' ><Twitter /></a>
                    <a href='#' target='_blank' ><Instagram /></a>
                    <a href='#' target='_blank' > <GitHub /></a>
                    <a href='#' target='_blank' ><YouTube /></a>
                </IconsBox>
                <ActionBox>
                    <Link href='/projects' ><Button style={{
                        background: '#53c28b',
                    }} variant='contained' >
                        See My Projects
                    </Button></Link>
                    <Button
                        style={{
                            color: '#53c28b',
                        }} >
                        See My Resume
                    </Button>
                </ActionBox>
            </Section>
            <Section>
                <MyImage className="image" src={ImageURL} alt="portfolio-image" />
            </Section>
        </Container>
    )
}

export default Portfolio