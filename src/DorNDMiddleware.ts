import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { setShowPrize } from "./ReduxStateSlices/showPrizeSlice";
import { resetShowOffer } from "./ReduxStateSlices/showOfferSlice";
import { setShowCards } from "./ReduxStateSlices/showCardsSlice";
import { audioThinking, playAudioSegment } from "./Audio";

export const onClickDeal = createAction('onClickDeal');
export const onClickNoDeal = createAction('onClickNoDeal');

export const initDorNDMiddleware = () => {
    
    const DorNDkMiddleware = createListenerMiddleware();
    const startListening = DorNDkMiddleware.startListening.withTypes<RootState, AppDispatch>();

    startListening ({
        actionCreator: onClickDeal,
        effect: async (action, listenerApi) => {
            listenerApi.dispatch(setShowPrize()); 
            listenerApi.dispatch(resetShowOffer());
        }
        });
        startListening ({
            actionCreator: onClickNoDeal,
            effect: async (action, listenerApi) => {
                const sums = listenerApi.getState().sums.value;
                if (sums.length === 2) {
                    listenerApi.dispatch(resetShowOffer()); 
                    listenerApi.dispatch(setShowCards());
                    playAudioSegment(35, 39);
                  } else {
                    listenerApi.dispatch(resetShowOffer()); 
                    listenerApi.dispatch(setShowCards());
                    audioThinking.play();
                  }
            }
            });

    return DorNDkMiddleware.middleware;

}