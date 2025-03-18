import { Box, Grid } from "@chakra-ui/react";

interface Props {
    clickedButtons: boolean[];
    firstClickedIndex: number | null;
    sums: number[];
    handleClick: (index: number) => void;
  }


const CentralBoxes = ({clickedButtons, firstClickedIndex, sums, handleClick} : Props) => {


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
              {boxPositionList.map(({ row, colStart }, index) => {
                const isFirstClicked = firstClickedIndex === index;
                const isClicked = clickedButtons[index];
                return (
                  <Box
                    as="button"
                    key={index}
                    onClick={() => handleClick(index)}
                    disabled={isClicked && !isFirstClicked}
                    bg={
                      clickedButtons[index]
                        ? firstClickedIndex === index &&
                          (sums.length > 1 ||
                            sums[0] !== sums[firstClickedIndex])
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
  )
}

export default CentralBoxes
