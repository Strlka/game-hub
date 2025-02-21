import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { onImgClose, resetShowImg } from "./ReduxStateSlices/showImgSlice";
import { setShowOffer } from "./ReduxStateSlices/showOfferSlice";
import { resetShowCards } from "./ReduxStateSlices/showCardsSlice";
import { setShowFinalOffer } from "./ReduxStateSlices/showFinalOfferSlice";

export const initImgCloseMiddleware = () => {
    
    const imgClosekMiddleware = createListenerMiddleware();
    const startListening = imgClosekMiddleware.startListening.withTypes<RootState, AppDispatch>();

    startListening ({
        actionCreator: onImgClose,
        effect: async (action, listenerApi) => {
            const sums = listenerApi.getState().sums.value;
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
                  listenerApi.dispatch(setShowOffer()); listenerApi.dispatch(resetShowCards());
                }
                if (sums.length === 1) {
                  listenerApi.dispatch(setShowFinalOffer()); listenerApi.dispatch(resetShowCards());
                }
                listenerApi.dispatch(resetShowImg());
                
              },
        })

        return imgClosekMiddleware.middleware;
    }