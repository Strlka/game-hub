// import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
// import NavBar from "./components/NavBar";
// import GameGrid from "./components/GameGrid";
// import GenreList from "./components/GenreList";
// import { useState } from "react";
// import { Genre } from "./hooks/useGenres";
// import PlatformSelector from "./components/PlatformSelector";
// import { Platform } from "./hooks/useGames";
// import SortSelector from "./components/SortSelector";
// import GameHeading from "./components/GameHeading";

// export interface GameQuery {
//   genre: Genre | null;
//   platform: Platform | null;
//   sortOrder: string;
//   searchText: string;
// }

// function App() {
//   const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

//   return (
//     <Grid
//       templateAreas={{
//         base: `"nav" "main"`,
//         lg: `"nav nav" "aside main"`,
//       }}
//       templateColumns={{
//         base: "1fr",
//         lg: "200 1fr",
//       }}
//     >
//       <GridItem area="nav">
//         <NavBar
//           onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
//         />
//       </GridItem>
//       <Show above="lg">
//         <GridItem area="aside" paddingX={5}>
//           <GenreList
//             selectedGenre={gameQuery.genre}
//             onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
//           />
//         </GridItem>
//       </Show>
//       <GridItem area="main">
//         <Box paddingLeft={2}>
//           <GameHeading gameQuery={gameQuery} />
//           <Flex marginBottom={5}>
//             <Box marginRight={5}>
//               <PlatformSelector
//                 selectedPlatform={gameQuery.platform}
//                 onSelectPlatform={(platform) =>
//                   setGameQuery({ ...gameQuery, platform })
//                 }
//               />
//             </Box>
//             <SortSelector
//               sortOrder={gameQuery.sortOrder}
//               onSelectSortOrder={(sortOrder) =>
//                 setGameQuery({ ...gameQuery, sortOrder })
//               }
//             />
//           </Flex>
//         </Box>
//         <GameGrid gameQuery={gameQuery} />
//       </GridItem>
//     </Grid>
//   );
// }

// export default App;

import React, { useState } from "react";
import { Box, ChakraProvider, Grid, GridItem } from "@chakra-ui/react";

const App = () => {
  const [caseNumber, setCaseNumber] = useState<number>(1);
  const [clickedButtons, setClickedButtons] = useState<boolean[]>(
    Array(26).fill(false)
  );
  const [openedPhotos, setOpenedPhotos] = useState<number[]>([]);
  const [firstClickedIndex, setFirstClickedIndex] = useState<number | null>(
    null
  );

  const handleClick = (index: number) => {
    if (firstClickedIndex === null) {
      setFirstClickedIndex(index);
    } else {
      const nextCaseNumber = caseNumber > 26 ? 1 : caseNumber;
      const url = `/assets/Photo_game/${nextCaseNumber}.jpeg`;
      const windowFeatures = "width=600,height=900,left=400,top=100";
      window.open(url, "_blank", windowFeatures);

      const sums = [
        100, 50, 300000, 750, 10, 300, 1, 1000, 1000000, 200000, 500000, 5000,
        10000, 0.01, 75000, 75, 25000, 5, 500, 50000, 100000, 200, 750000, 400,
        25, 400000,
      ];
      const sum = sums[nextCaseNumber - 1];

      setCaseNumber(nextCaseNumber + 1);
      setOpenedPhotos((prevOpenedPhotos) => [...prevOpenedPhotos, sum]);
    }

    setClickedButtons((prevState) => {
      const newClickedButtons = [...prevState];
      newClickedButtons[index] = true;
      return newClickedButtons;
    });
  };

  const renderSumBox = (sum: number) => (
    <Box
      borderRadius="md"
      bg={openedPhotos.includes(sum) ? "yellow.50" : "yellow.300"}
      color="black"
      px={4}
      h={10}
      margin={2}
      textAlign="center"
    >
      $ {sum}
    </Box>
  );

  const getGridPosition = (index: number) => {
    if (index < 5) return { row: 1, colStart: index + 2 }; // 1-я строка, 5 элементов по центру
    if (index < 12) return { row: 2, colStart: index - 4 }; // 2-я строка, 7 элементов по центру
    if (index < 19) return { row: 3, colStart: index - 11 }; // 3-я строка, 7 элементов по центру
    return { row: 4, colStart: index - 18 }; // 4-я строка, 7 элементов по центру
  };

  return (
    <ChakraProvider>
      <div>
        <Grid templateColumns="200px 1fr 200px" h="100vh" gap={2}>
          <GridItem bg="black" marginTop={2}>
            {renderSumBox(0.01)}
            {renderSumBox(1)}
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
            >
              {Array.from({ length: 26 }, (_, index) => {
                const { row, colStart } = getGridPosition(index);
                return (
                  <Box
                    as="button"
                    key={index}
                    onClick={() => handleClick(index)}
                    disabled={clickedButtons[index]}
                    bg={
                      clickedButtons[index]
                        ? firstClickedIndex === index
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
                    {index + 1}
                  </Box>
                );
              })}
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
