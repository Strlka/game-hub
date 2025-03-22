import { createSlice } from '@reduxjs/toolkit'

export interface showCardsState {
  value: boolean,
}

const initialState: showCardsState = {
  value: false,
}

export const showCardsSlice = createSlice({
  name: 'showCards',
  initialState,
  reducers: {
    setShowCards: (state) => {
        state.value = true;
    },
    resetShowCards: (state) => {
        state.value = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setShowCards, resetShowCards } = showCardsSlice.actions

export default showCardsSlice.reducer