import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface firstClickedIndexState {
  value: number | null,
}

const initialState: firstClickedIndexState = {
  value: null,
}

export const firstClickedIndexSlice = createSlice({
  name: 'firstClickedIndex',
  initialState,
  reducers: {
    setFirstClickedIndex: (state, action: PayloadAction<number>) => {
        state.value = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setFirstClickedIndex } = firstClickedIndexSlice.actions

export default firstClickedIndexSlice.reducer