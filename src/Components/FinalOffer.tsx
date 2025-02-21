import { Box, Button, Text  } from "@chakra-ui/react";

interface Props {
    offer: number | undefined;
    onClickPrize: () => void;
}

const FinalOffer = ({offer, onClickPrize }: Props) => {
  return (
<Box id="offer"
              w="600px"
              h="400px"
              borderRadius="6px"
              shadow="lg"
              bg="gray.50"
              display="grid" 
              justifyContent="center"
              justifyItems="center" 
              alignItems="center"
              position="fixed" 
              top="20%" 
              left="30%" 
              >
                <Text fontSize={60}>YOU WON</Text>
                <Text fontSize={128}>$ {offer}</Text>
                <Button w="230px" h="70px" bg="yellow.300" onClick={onClickPrize}>
                    OK
                </Button>
              </Box>
  )
}

export default FinalOffer
