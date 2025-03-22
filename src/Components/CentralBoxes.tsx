import { Box, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { audioMainTheme, playAudioSegment } from "../Audio";

interface Props {
    clickedButtons: boolean[];
    firstClickedIndex: number | null;
    sums: number[];
    handleClick: (index: number) => void;
  }

const MotionBox = motion(Box);

const CentralBoxes = ({clickedButtons, firstClickedIndex, sums, handleClick} : Props) => {

  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);

  useEffect(() => {
    const delay = 450; // Задержка между появлением каждого элемента
    boxPositionList.forEach((_, index) => {
        setTimeout(() => {
            audioMainTheme.play();
            setVisibleBoxes((prev) => [...prev, index]);
            if (index === boxPositionList.length - 1) {
              setTimeout(() => {
                  audioMainTheme.pause();
                  playAudioSegment(5, 8);
              }, delay); // Небольшая задержка для корректного завершения
          }
        }, index * delay);
    });
}, []);


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
                const isVisible = visibleBoxes.includes(index);
                return (
                  <MotionBox
                    as="button"
                    key={index}
                    onClick={() => handleClick(index)}
                    pointerEvents={isClicked && !isFirstClicked ? "none" : "auto"}
                    _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
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
                  </MotionBox>
                );
              })}
            </Grid>
  )
}

export default CentralBoxes


