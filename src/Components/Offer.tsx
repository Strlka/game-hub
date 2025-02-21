import { Box, Button, ButtonGroup, Text  } from "@chakra-ui/react";


interface Props {
    offer: number | undefined;
    onClickDeal: () => void;
    onClickNoDeal: () => void;
}

const Offer = ({offer, onClickDeal, onClickNoDeal }: Props) => {
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
          <Text fontSize={60}> BANKER'S OFFER</Text>
          <Text fontSize={128}>$ {offer}</Text>
          <ButtonGroup>
            <Button w="230px" h="70px" bg="yellow.300" onClick={onClickDeal}>
                Deal
            </Button>
            <Button w="230px" h="70px" onClick={onClickNoDeal}>
                No deal
            </Button>
          </ButtonGroup>
        </Box>
  )

}



export default Offer
