import { Box, Button, Image } from '@chakra-ui/react';

interface Props {
    hideStartScreen: () => void;
  }

const StartScreen = ({hideStartScreen}: Props) => {


  return (
    <Box id="prize"
        w="600px"
        h="400px"
        borderRadius="6px"
        shadow="lg"
         bg="gray.50"
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)" 
        gridTemplateRows="repeat(2, 1fr)"    
        justifyContent="center"
        justifyItems="center" 
        alignItems="center"
        position="fixed" 
        top="20%" 
        left="30%" 
    > 

        <Image
            gridColumn="span 2 / span 2"
            gridRow="span 2 / span 2" 
            src="src/assets/Vakson.PNG"
            objectFit="contain"
            position="absolute"
            top="5%"
            left="10%"
            maxW="60vw" 
            maxH="50vh" 
        /> 
        <Button
            w="260px" h="100px" bg="yellow.300" fontSize="45px"
            position="absolute" 
            top="40%" 
            left="52%" 
            onClick={hideStartScreen}>
                Let's GO {'\u{1F680}'}
        </Button>
    </Box>
  )
}

export default StartScreen
