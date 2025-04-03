import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { onButtonClick, setClickedButtons } from "./ReduxStateSlices/clickedButtonsSlice";
import { setFirstClickedIndex } from "./ReduxStateSlices/firstClickedIndexSlice";
import { setSums } from "./ReduxStateSlices/sumsSlice";
import { setShowPhoto } from "./ReduxStateSlices/showPhotoSlice";
import { setShowImg } from "./ReduxStateSlices/showImgSlice";
import { setOpenedPhotos } from "./ReduxStateSlices/openedPhotosSlice";
import { audioThinking, playAudioSegmentCaseIsOpen } from "./Audio";

export const initBoxClickMiddleware = () => {
    
    const boxClickMiddleware = createListenerMiddleware();
    const startListening = boxClickMiddleware.startListening.withTypes<RootState, AppDispatch>();

    startListening ({
        actionCreator: onButtonClick,
        effect: async (action, listenerApi) => {
            const firstClickedIndex = listenerApi.getState().firstClickedIndex.value;
            const sums = listenerApi.getState().sums.value;

            if (firstClickedIndex === null) {
                listenerApi.dispatch(setFirstClickedIndex(action.payload));
                listenerApi.dispatch(setClickedButtons(action.payload));
              } else if (firstClickedIndex !== action.payload) {
          
                const pickAndRemoveRandom = (arr: number[], index: number): number | null => {
          
                  if (arr.length === 0) return null; // Если массив пуст, возвращаем null
          
                  listenerApi.dispatch(setSums(arr.filter(item => item !== listenerApi.getState().sums.sortValue[index])));
                  return listenerApi.getState().sums.sortValue[index];
                };
          
                const sum = pickAndRemoveRandom(sums, action.payload);

                audioThinking.pause();
                listenerApi.dispatch(setShowPhoto(sum));
                listenerApi.dispatch(setShowImg());
         
          
                if (sum !== null) {
                listenerApi.dispatch(setOpenedPhotos(sum));
                  if (sum >= 10000) {
                    playAudioSegmentCaseIsOpen(0, 4);
                  } else {
                    playAudioSegmentCaseIsOpen(6, 7);
                  }
                }
                listenerApi.dispatch(setClickedButtons(action.payload));
              } else if (sums.length === 2) {
                const pickAndRemoveRandom = (arr: number[], index: number): number | null => {
          
                  if (arr.length === 0) return null; // Если массив пуст, возвращаем null
          
                  listenerApi.dispatch(setSums(arr.filter(item => item !== listenerApi.getState().sums.sortValue[index])));
                  return listenerApi.getState().sums.sortValue[index];
                };
          
                const sum = pickAndRemoveRandom(sums, action.payload);

                audioThinking.pause();
                listenerApi.dispatch(setShowPhoto(sum));
                listenerApi.dispatch(setShowImg());

                if (sum !== null) {
                listenerApi.dispatch(setOpenedPhotos(sum));
                }
                listenerApi.dispatch(setClickedButtons(action.payload));
              }
                
              },
        })

        return boxClickMiddleware.middleware;
    }

