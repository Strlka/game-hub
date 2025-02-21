import { Box, Button, Text, Image  } from "@chakra-ui/react";

interface Props {
    offer: number | undefined;
    handleRestart: () => void;
}

const Prize = ({offer, handleRestart }: Props) => {
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
        <Text
        gridColumn={`span 1 / span 2`}
        gridRow={`span 1 / span 1`} 
        fontSize={128}
        position="absolute"
        top="3%"
        >
            $ {offer}
        </Text>
        <Image
        gridColumn={`span 2 / span 2`}
        gridRow={`span 2 / span 2`} 
        src="src/assets/IMG_3170.PNG"
        objectFit="contain"
        position="absolute"
        top="45%"
        left="65%"
        maxW="30vw" 
        maxH="30vh" 
        /> 
        <Button 
        w="230px" 
        h="70px" 
        bg="yellow.300" 
        position="absolute"
        top="70%"
        left="10%" 
        onClick={handleRestart}>
            New game
        </Button>
    </Box>
  )
}

export default Prize
