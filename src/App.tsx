import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import LeftRightBoxes from "./Components/LeftRightBoxes";
import CentralBoxes from "./Components/CentralBoxes";
import Offer from "./Components/Offer";
import FinalOffer from "./Components/FinalOffer";
import Prize from "./Components/Prize";
import BoxWithImage from "./Components/BoxWithImage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { onButtonClick } from "./ReduxStateSlices/clickedButtonsSlice";
import { resetShowFinalOffer } from "./ReduxStateSlices/showFinalOfferSlice";
import { setShowPrize } from "./ReduxStateSlices/showPrizeSlice";
import { onImgClose } from "./ReduxStateSlices/showImgSlice";
import { onClickDeal, onClickNoDeal } from "./DorNDMiddleware";
import { useState } from "react";
import StartScreen from "./Components/StartScreen";
import { setShowCards } from "./ReduxStateSlices/showCardsSlice";



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

  const [showStartScreen, hideStartScreen] = useState(true);
  const onClickStart = () => { 
    hideStartScreen(false); 
    dispatch(setShowCards());
  }

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
 
 
  const handleImgClose = () => {
    dispatch(onImgClose());
  };


  const onClickDeall = () => {dispatch(onClickDeal())};
  const onClickNoDeall = () => {dispatch(onClickNoDeal())};


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
            {showStartScreen &&  
              <StartScreen hideStartScreen={onClickStart}/>
            }
            {showCards &&
              <CentralBoxes clickedButtons={clickedButtons} firstClickedIndex={firstClickedIndex} sums={sums} handleClick={handleClick} />
            }
            {showImg &&
              <BoxWithImage showPhoto={showPhoto} onImgClose={handleImgClose} />
            }
            { showOffer &&
              <Offer offer={offer} onClickDeal={onClickDeall} onClickNoDeal={onClickNoDeall} />
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
