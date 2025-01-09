import { useMemo, useState } from "react";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import LeftRightBoxes from "./Components/LeftRightBoxes";
import CentralBoxes from "./Components/CentralBoxes";


// type Case = {
//   isOpened: boolean,
//   sum: number,
//   position: {row: number, colStart: number},
// }

// const unopenedCount = 26;
// const firstChoiceIndex = 0;

// type AppState = {
//   unopenedCount: number,
//   firstChoiceIndex: number,
//   cases: Case[]
// }

// Разделить на отдельные компоненты


const App = () => {
  const [clickedButtons, setClickedButtons] = useState<boolean[]>(Array(26).fill(false));
  const [openedPhotos, setOpenedPhotos] = useState<number[]>([]);
  const [firstClickedIndex, setFirstClickedIndex] = useState<number | null>(null);


  const [sums, setSums] = useState([
    100, 50, 300000, 750, 10, 300, 1, 1000, 1000000, 200000, 500000, 5000,
    10000, 0.01, 75000, 75, 25000, 5, 500, 50000, 100000, 200, 750000, 400,
    25, 400000,
  ]);


  const sumForBox = useMemo(() => {
    return sums.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  }, [])


  const handleClick = (index: number) => {
    if (firstClickedIndex === null) {
      setFirstClickedIndex(index);
    } else {

      const pickAndRemoveRandom = (arr: number[], index: number): number | null => {

        if (arr.length === 0) return null; // Если массив пуст, возвращаем null

        setSums(arr.filter(item => item !== sumForBox[index]));
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


  return (
    <ChakraProvider>
      <div>
        <Grid templateColumns="200px 1fr 200px" h="100vh" gap={2}>
          
         <GridItem bg="black" marginTop={2}>
            <LeftRightBoxes openedPhotos={openedPhotos} sums={[...sumForBox].sort((a, b) => a - b).slice(0,13)}/>
          </GridItem>
          <GridItem
            bgImage="url('/assets/BG_main_DorND.png')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          >
            <CentralBoxes clickedButtons={clickedButtons} firstClickedIndex={firstClickedIndex} sums={sums} sumForBox={sumForBox} offer={offer} handleClick={handleClick} />
          </GridItem>
          <GridItem bg="black" marginTop={2}>
            <LeftRightBoxes openedPhotos={openedPhotos} sums={[...sumForBox].sort((a, b) => a - b).slice(13)}/>
          </GridItem>
        </Grid>
      </div>
    </ChakraProvider>
  );
};

export default App;
