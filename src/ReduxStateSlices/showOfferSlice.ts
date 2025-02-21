import { createSlice } from '@reduxjs/toolkit'

export interface showOfferState {
  value: boolean,
}

const initialState: showOfferState = {
  value: false,
}

export const showOfferSlice = createSlice({
  name: 'showOffer',
  initialState,
  reducers: {
    setShowOffer: (state) => {
        state.value = true;
    },
    resetShowOffer: (state) => {
        state.value = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setShowOffer, resetShowOffer } = showOfferSlice.actions

export default showOfferSlice.reducer