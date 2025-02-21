import { createSlice } from '@reduxjs/toolkit'

export interface showPrizeState {
  value: boolean,
}

const initialState: showPrizeState = {
  value: false,
}

export const showPrizeSlice = createSlice({
  name: 'showPrize',
  initialState,
  reducers: {
    setShowPrize: (state) => {
        state.value = true;
    },
    resetShowPrize: (state) => {
        state.value = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setShowPrize, resetShowPrize } = showPrizeSlice.actions

export default showPrizeSlice.reducer