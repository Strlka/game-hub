import { Box, Button, ButtonGroup, Grid, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
    clickedButtons: boolean[];
    firstClickedIndex: number | null;
    sums: number[];
    sumForBox: number[];
    offer: number | undefined;
    handleClick: (index: number) => void;
  }


const CentralBoxes = ({clickedButtons, firstClickedIndex, sums, sumForBox, offer, handleClick} : Props) => {

    const [showOffer, setShowOffer] = useState(false);
    const [showFinalOffer, setShowFinalOffer] = useState(false);
    const [showCards, setShowCards] = useState(true);
    const [showPrize, setShowPrize] = useState(false);

    const boxPositionList = [
        {row: 1, colStart: 2},
        {row: 1, colStart: 3},
        {row: 1, colStart: 4},
        {row: 1, colStart: 5},
        {row: 1, colStart: 6},
        {row: 2, colStart: 1},
        {row: 2, colStart: 2},
        {row: 2, colStart: 3},
        {row: 2, colStart: 4},
        {row: 2, colStart: 5},
        {row: 2, colStart: 6},
        {row: 2, colStart: 7},
        {row: 3, colStart: 1},
        {row: 3, colStart: 2},
        {row: 3, colStart: 3},
        {row: 3, colStart: 4},
        {row: 3, colStart: 5},
        {row: 3, colStart: 6},
        {row: 3, colStart: 7},
        {row: 4, colStart: 1},
        {row: 4, colStart: 2},
        {row: 4, colStart: 3},
        {row: 4, colStart: 4},
        {row: 4, colStart: 5},
        {row: 4, colStart: 6},
        {row: 4, colStart: 7},
      ];

      const handleRestart = () => {
        window.location.reload(); 
      };

      useEffect(() => { 
        if (sums.length === 21 || 
          sums.length === 16 || 
          sums.length === 12 || 
          sums.length === 9 || 
          sums.length === 7 || 
          sums.length === 6 || 
          sums.length === 5 || 
          sums.length === 4 || 
          sums.length === 3 ||
          sums.length === 2 ) {
            const timer = setTimeout(() => {
              setShowOffer(true), setShowCards(false);
              }, 3000);
            return () => clearTimeout(timer);
          }
          if (sums.length === 1) {
            const timer = setTimeout(() => {
              setShowFinalOffer(true), setShowCards(false);
              }, 3000);
            return () => clearTimeout(timer);
          }
      }, [sums]);

  return (
      <Grid
              templateColumns="repeat(7, 120px)"
              templateRows="repeat(4, 120px)"
              gap={1}
              color="black"
              fontWeight="bold"
              justifyContent="center"
              justifyItems="center"
              alignItems="center"
              alignContent="center"
              h="100vh"
              position="relative"
              
            >
              {showCards && boxPositionList.map(({ row, colStart }, index) => {
                return (
                  <Box
                    as="button"
                    key={index}
                    onClick={() => handleClick(index)}
                    disabled={clickedButtons[index] && firstClickedIndex !== index } 
                    bg={
                      clickedButtons[index] 
                        ? (firstClickedIndex === index && (sums.length > 1 || sums[0] !== sums[firstClickedIndex]))
                          ? "yellow.300"
                          : "gray.50"
                        : "gray.400"
                    }
                    color="black"
                    fontSize={32}
                    fontWeight="bold"
                    _hover={{
                      bg: clickedButtons[index] ? "gray.50" : "gray.50",
                    }}
                    w="100px"
                    h="100px"
                    borderRadius="6px"
                    boxShadow="2xl"
                    gridColumn={`span 1 / span 1`}
                    gridRow={`span 1 / span 1`}
                    gridColumnStart={colStart}
                    gridRowStart={row}
                  >
                    {index + 1} ({sumForBox[index]})
                  </Box>
                );
              })}
              { showOffer &&
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
                <Text fontSize={60}>BANKER'S OFFER</Text>
                <Text fontSize={128}>$ {offer}</Text>
                <ButtonGroup>
                  <Button w="230px" h="70px" bg="yellow.300" onClick={() => {setShowPrize(true), setShowOffer(false)}}>
                      Deal
                  </Button>
                  <Button w="230px" h="70px" onClick={() => {
                    setShowOffer(false), 
                    setShowCards(true)
                    }}>
                      No deal
                  </Button>
                </ButtonGroup>
              </Box>
              }

              { showFinalOffer &&
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
                <Button w="230px" h="70px" bg="yellow.300" onClick={() => {setShowPrize(true), setShowFinalOffer(false)}}>
                    OK
                </Button>
              </Box>
              }

              {showPrize &&
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
                    onClick={() => {handleRestart()}}>
                      New game
                  </Button>
                </Box>
              }
            </Grid>
  )
}

export default CentralBoxes
