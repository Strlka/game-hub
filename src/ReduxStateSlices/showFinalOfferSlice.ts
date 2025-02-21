import { createSlice } from '@reduxjs/toolkit'

export interface showFinalOfferState {
  value: boolean,
}

const initialState: showFinalOfferState = {
  value: false,
}

export const showFinalOfferSlice = createSlice({
  name: 'showFinalOffer',
  initialState,
  reducers: {
    setShowFinalOffer: (state) => {
        state.value = true;
    },
    resetShowFinalOffer: (state) => {
        state.value = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setShowFinalOffer, resetShowFinalOffer } = showFinalOfferSlice.actions

export default showFinalOfferSlice.reducer