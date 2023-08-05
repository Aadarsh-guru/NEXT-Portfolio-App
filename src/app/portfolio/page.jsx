'use client'
import ImageURL from "public/my-image.png";
import Image from 'next/image';
import { Box, Button, Typography, styled } from "@mui/material";

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

})

const SubHeading = styled(Typography)({

})

const Description = styled(Typography)({

})

const IconsBox = styled(Box)({

})

const ActionBox = styled(Box)({

})

const Portfolio = () => {
    return (
        <Container>
            <Section>
                <Heading></Heading>
                <SubHeading></SubHeading>
                <Description></Description>
                <IconsBox>

                </IconsBox>
                <ActionBox>
                    <Button variant='contained' >
                        Visit My Projects
                    </Button>
                    <Button>
                        Visit My Resume
                    </Button>
                </ActionBox>
            </Section>
            <Section>
                <MyImage src={ImageURL} alt="portfolio-image" />
            </Section>
        </Container>
    )
}

export default Portfolio