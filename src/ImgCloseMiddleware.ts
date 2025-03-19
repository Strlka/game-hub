import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { onImgClose, resetShowImg } from "./ReduxStateSlices/showImgSlice";
import { resetShowOffer, setShowOffer } from "./ReduxStateSlices/showOfferSlice";
import { resetShowCards } from "./ReduxStateSlices/showCardsSlice";
import { setShowFinalOffer } from "./ReduxStateSlices/showFinalOfferSlice";
import { playAudioSegment } from "./Audio";

export const initImgCloseMiddleware = () => {
    
    const imgClosekMiddleware = createListenerMiddleware();
    const startListening = imgClosekMiddleware.startListening.withTypes<RootState, AppDispatch>();

    const soundBankerIsCalling = new Audio('src/assets/Sounds/the-banker-is-calling-phone-101soundboards.mp3');


    startListening ({
        actionCreator: onImgClose,
        effect: async (action, listenerApi) => {
          listenerApi.cancelActiveListeners();
            const sums = listenerApi.getState().sums.value;
            const forkFnMain = listenerApi.fork(async (forkApi) => {
            if (sums.length === 21 || 
                sums.length === 16 || 
                sums.length === 12 || 
                sums.length === 9 || 
                sums.length === 7 || 
                sums.length === 6 || 
                sums.length === 5 || 
                sums.length === 4 || 
                sums.length === 2 ||
                sums.length === 2 ) {
                  soundBankerIsCalling.play();
                  listenerApi.dispatch(resetShowCards());
                    await forkApi.delay(1500);
                    listenerApi.dispatch(setShowOffer()); 
                    // await forkApi.delay(1000);
                    const isCancelled = await listenerApi.condition((action) => action.type === resetShowOffer.type, 1000);
                    if (isCancelled) {
                      listenerApi.cancel();
                    }
                      playAudioSegment(20, 23);
                  }
              });
                  // setTimeout(() => {
                  //   listenerApi.dispatch(setShowOffer()); 
                  //   listenerApi.dispatch(resetShowCards());
                  //   setTimeout(() => {
                  //     playAudioSegment(20, 23);
                  //   }, 1000);
                  // }, 1500);
                const forkFntwo = listenerApi.fork(async (forkApi) => {
                if (sums.length === 3) {

                  soundBankerIsCalling.play();
                  listenerApi.dispatch(resetShowCards());
                  await forkApi.delay(1500);
                  listenerApi.dispatch(setShowOffer()); 
                  await forkApi.delay(1000);
                  playAudioSegment(20, 23);
                }
              });
              const forkFnone = listenerApi.fork(async (forkApi) => {
                if (sums.length === 1) {
                  listenerApi.dispatch(setShowFinalOffer()); listenerApi.dispatch(resetShowCards());
                }
              });
                
              listenerApi.dispatch(resetShowImg());
                

              await Promise.all([forkFnMain.result, forkFntwo.result, forkFnone.result]);

              },
        })

        return imgClosekMiddleware.middleware;
    }