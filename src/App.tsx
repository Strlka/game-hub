import { useMemo } from "react";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import LeftRightBoxes from "./Components/LeftRightBoxes";
import CentralBoxes from "./Components/CentralBoxes";
import Offer from "./Components/Offer";
import FinalOffer from "./Components/FinalOffer";
import Prize from "./Components/Prize";
import BoxWithImage from "./Components/BoxWithImage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { onButtonClick, setClickedButtons } from "./ReduxStateSlices/clickedButtonsSlice";
import { setOpenedPhotos } from "./ReduxStateSlices/openedPhotosSlice";
import { setFirstClickedIndex } from "./ReduxStateSlices/firstClickedIndexSlice";
import { resetShowOffer, setShowOffer } from "./ReduxStateSlices/showOfferSlice";
import { resetShowFinalOffer, setShowFinalOffer } from "./ReduxStateSlices/showFinalOfferSlice";
import { resetShowCards, setShowCards } from "./ReduxStateSlices/showCardsSlice";
import { setShowPrize } from "./ReduxStateSlices/showPrizeSlice";
import { setShowPhoto } from "./ReduxStateSlices/showPhotoSlice";
import { onImgClose, resetShowImg, setShowImg } from "./ReduxStateSlices/showImgSlice";
import { setSums } from "./ReduxStateSlices/sumsSlice";



// type ActionName = 
// 'BoxClick' |
// 'ShowImg' |
// 'CloseImg' |
// 'ShowOffer' |
// 'CloseOffer' |
// 'TakeOffer' |
// 'ShowPrize' |
// 'ShowLastSum' |
// 'Init' |
// 'ReStart';


const App = () => {

  const clickedButtons = useSelector((state: RootState) => state.clickedButtons.value);
  const openedPhotos = useSelector((state: RootState) => state.openedPhotos.value);
  const firstClickedIndex = useSelector((state: RootState) => state.firstClickedIndex.value);
  const showOffer = useSelector((state: RootState) => state.showOffer.value);
  const showFinalOffer = useSelector((state: RootState) => state.showFinalOffer.value);
  const showCards = useSelector((state: RootState) => state.showCards.value);
  const showPrize = useSelector((state: RootState) => state.showPrize.value);
  const showPhoto = useSelector((state: RootState) => state.showPhoto.value);
  const showImg = useSelector((state: RootState) => state.showImg.value);
  const sums = useSelector((state: RootState) => state.sums.value);
  const dispatch = useDispatch();


  const sumForBox = useSelector((state: RootState) => state.sums.sortValue);

  // const sumForBox = useMemo(() => {
  //   return sums.map(value => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value)
  // }, [])


  // const handleClick = (index: number) => {
  //   if (firstClickedIndex === null) {
  //     dispatch(setFirstClickedIndex(index));
  //   } else {

  //     const pickAndRemoveRandom = (arr: number[], index: number): number | null => {

  //       if (arr.length === 0) return null; // Если массив пуст, возвращаем null

  //       dispatch(setSums(arr.filter(item => item !== sumForBox[index])));
  //       return sumForBox[index];
  //     };

  //     const sum = pickAndRemoveRandom(sums, index);
  //     dispatch(setShowPhoto(sum));
  //     dispatch(setShowImg());

  //     if (sum !== null) {
  //     dispatch(setOpenedPhotos(sum));
  //     }

  //   }
  //     dispatch(setClickedButtons(index));
      
  //   };

  const handleClick = (index: number) => {
    dispatch(onButtonClick(index));
  };

  const handleRestart = () => {
    window.location.reload(); 
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

  // const onImgClose = () => {
  //   if (sums.length === 21 || 
  //     sums.length === 16 || 
  //     sums.length === 12 || 
  //     sums.length === 9 || 
  //     sums.length === 7 || 
  //     sums.length === 6 || 
  //     sums.length === 5 || 
  //     sums.length === 4 || 
  //     sums.length === 3 ||
  //     sums.length === 2 ) {
  //       dispatch(setShowOffer()); dispatch(resetShowCards());
  //     }
  //     if (sums.length === 1) {
  //       dispatch(setShowFinalOffer()); dispatch(resetShowCards());
  //     }
  //     dispatch(resetShowImg());
  // };

  const handleImgClose = () => {
    dispatch(onImgClose());
  };


  const onClickDeal = () => {dispatch(setShowPrize()); dispatch(resetShowOffer())};
  const onClickNoDeal = () => {dispatch(resetShowOffer()); dispatch(setShowCards())};
  const onClickPrize =() => {dispatch(setShowPrize()); dispatch(resetShowFinalOffer())};


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
            {showCards &&
              <CentralBoxes clickedButtons={clickedButtons} firstClickedIndex={firstClickedIndex} sums={sums} handleClick={handleClick} />
            }
            {showImg &&
              <BoxWithImage showPhoto={showPhoto} onImgClose={handleImgClose} />
            }
            { showOffer &&
              <Offer offer={offer} onClickDeal={onClickDeal} onClickNoDeal={onClickNoDeal} />
            }
            { showFinalOffer &&
              <FinalOffer offer={offer} onClickPrize={onClickPrize} />
            }
            {showPrize &&
              <Prize offer={offer} handleRestart={handleRestart} />
            }
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
