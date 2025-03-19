import { configureStore } from '@reduxjs/toolkit'
import clickedButtonsReducer from './ReduxStateSlices/clickedButtonsSlice'
import openedPhotosReducer from './ReduxStateSlices/openedPhotosSlice'
import firstClickedIndexReducer from './ReduxStateSlices/firstClickedIndexSlice'
import showOfferReducer from './ReduxStateSlices/showOfferSlice'
import showFinalOfferReducer from './ReduxStateSlices/showFinalOfferSlice'
import showCardsReducer from './ReduxStateSlices/showCardsSlice'
import showPrizeReducer from './ReduxStateSlices/showPrizeSlice'
import showPhotoReducer from './ReduxStateSlices/showPhotoSlice'
import showImgReducer from './ReduxStateSlices/showImgSlice'
import sumsReducer from './ReduxStateSlices/sumsSlice'
import { initBoxClickMiddleware } from './BoxClickMiddleware'
import { initImgCloseMiddleware } from './ImgCloseMiddleware'
import { initDorNDMiddleware } from './DorNDMiddleware'

export const store = configureStore({
  reducer: {
    clickedButtons: clickedButtonsReducer,
    openedPhotos: openedPhotosReducer,
    firstClickedIndex: firstClickedIndexReducer,
    showOffer: showOfferReducer,
    showFinalOffer: showFinalOfferReducer,
    showCards: showCardsReducer,
    showPrize: showPrizeReducer,
    showPhoto: showPhotoReducer,
    showImg: showImgReducer,
    sums: sumsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(initBoxClickMiddleware(), initImgCloseMiddleware(), initDorNDMiddleware()),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch