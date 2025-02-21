import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface clickedButtonsState {
  value: boolean[],
}

const initialState: clickedButtonsState = {
  value: Array(26).fill(false),
}

export const clickedButtonsSlice = createSlice({
  name: 'clickedButtons',
  initialState,
  reducers: {
    setClickedButtons: (state, action: PayloadAction<number>) => {
        state.value[action.payload] = true;
    },
    onButtonClick: (state, action: PayloadAction<number>) => {},
  }
})

// Action creators are generated for each case reducer function
export const { setClickedButtons, onButtonClick } = clickedButtonsSlice.actions

export default clickedButtonsSlice.reducer