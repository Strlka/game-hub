import { useEffect, useMemo, useState } from "react";
import { Box, Button, ButtonGroup, ChakraProvider, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import BoxOffer from "./Components/BoxOffer";

type Case = {
  isOpened: boolean,
  sum: number,
  position: {row: number, colStart: number},
}

const unopenedCount = 26;
const firstChoiceIndex = 0;

// type AppState = {
//   unopenedCount: number,
//   firstChoiceIndex: number,
//   cases: Case[]
// }




const App = () => {
  const [clickedButtons, setClickedButtons] = useState<boolean[]>(Array(26).fill(false));
  const [openedPhotos, setOpenedPhotos] = useState<number[]>([]);
  const [firstClickedIndex, setFirstClickedIndex] = useState<number | null>(null);
  const [showOffer, setShowOffer] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const [showPrize, setShowPrize] = useState(false);
  // const [cases, setCases] = useState<Array<Case>>([
  //   {
  //     isOpened: false,
  //     sum: 0,
  //     position: {row: 1, colStart: 2},
  //   },
  //   {
  //     isOpened: false,
  //     sum: 0,
  //     position: {row: 1, colStart: 3},
  //   }
  // ])

  const [sums, setSums] = useState(Array(26).fill(false));

  const sumForBox = useMemo(() => {
    return [
      100, 50, 300000, 750, 10, 300, 1, 1000, 1000000, 200000, 500000, 5000,
      10000, 0.01, 75000, 75, 25000, 5, 500, 50000, 100000, 200, 750000, 400,
      25, 400000,
    ].map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  }, [])


  const handleClick = (index: number) => {
    if (firstClickedIndex === null) {
      setFirstClickedIndex(index);
    } else {

      const pickAndRemoveRandom = (arr: number[], index: number): number | null => {

        if (arr.length === 0) return null; // Если массив пуст, возвращаем null
        arr.pop();
        setSums([...arr]);
        return sumForBox[index];
      };

      const sum = pickAndRemoveRandom(sums, index);

      if (sum !== null) {
      setOpenedPhotos((prevOpenedPhotos) => [...prevOpenedPhotos, sum]);
      }

      const url = `src/assets/Photo_game/${sum}.jpeg`;
      const windowFeatures = "width=600,height=900,left=400,top=100";
      window.open(url, "_blank", windowFeatures);
    }

      setClickedButtons((prevState) => {
        const newClickedButtons = [...prevState];
        newClickedButtons[index] = true;
        return newClickedButtons;
      });

      console.log(sums.length);
    };


  let offer: number | undefined;
  if (sums.length !== 0) {
    if (sums.length >= 16) { 
      offer = Math.floor(sums.reduce((sum, current) => sum + current) / sums.length / 3);
    }
    if (sums.length === 1) {
      offer = sums[0];
    } else {
    offer = Math.floor(sums.reduce((sum, current) => sum + current) / sums.length);
    }
  };

  console.log(offer);
    
  useEffect(() => { // Добавить финальный оффер когда sums.length === 1 (еще один бокс-элемент)
    if (sums.length === 21 || 
      sums.length === 16 || 
      sums.length === 12 || 
      sums.length === 9 || 
      sums.length === 7 || 
      sums.length === 6 || 
      sums.length === 5 || 
      sums.length === 4 || 
      sums.length === 3 ||
      sums.length === 2 ||
      sums.length === 1) {
        const timer = setTimeout(() => {
          setShowOffer(true), setShowCards(false);
          }, 3000);
        return () => clearTimeout(timer);
      }
  }, [sums]);


  const renderSumBox = (sum: number) => (
    <BoxOffer sum={sum} openedPhotos={openedPhotos}>
    </BoxOffer>
  );

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


  return (
    <ChakraProvider>
      <div>
        <Grid templateColumns="200px 1fr 200px" h="100vh" gap={2}>
          <GridItem bg="black" marginTop={2}>
            {renderSumBox(0.01)}
            <BoxOffer sum={1} openedPhotos={openedPhotos}></BoxOffer>
            {/* {renderSumBox(1)} */}
            {renderSumBox(5)}
            {renderSumBox(10)}
            {renderSumBox(25)}
            {renderSumBox(50)}
            {renderSumBox(75)}
            {renderSumBox(100)}
            {renderSumBox(200)}
            {renderSumBox(300)}
            {renderSumBox(400)}
            {renderSumBox(500)}
            {renderSumBox(750)}
          </GridItem>
          <GridItem
            bgImage="url('/assets/BG_main_DorND.png')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          >
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
                    disabled={clickedButtons[index] && sums.length !== 2} // Поправить, сейчас включаются все боксы
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
          </GridItem>
          <GridItem bg="black" marginTop={2}>
            {renderSumBox(1000)}
            {renderSumBox(5000)}
            {renderSumBox(10000)}
            {renderSumBox(25000)}
            {renderSumBox(50000)}
            {renderSumBox(75000)}
            {renderSumBox(100000)}
            {renderSumBox(200000)}
            {renderSumBox(300000)}
            {renderSumBox(400000)}
            {renderSumBox(500000)}
            {renderSumBox(750000)}
            {renderSumBox(1000000)}
          </GridItem>
        </Grid>
      </div>
    </ChakraProvider>
  );
};

export default App;
