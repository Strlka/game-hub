import { createSlice } from '@reduxjs/toolkit'

export interface showCardsState {
  value: boolean,
  firstRender: boolean,
}

const initialState: showCardsState = {
  value: false,
  firstRender: true,
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
    setFirstRender: (state) => {
      state.firstRender = false;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setShowCards, resetShowCards, setFirstRender } = showCardsSlice.actions

export default showCardsSlice.reducer