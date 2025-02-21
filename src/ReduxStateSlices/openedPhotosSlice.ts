import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface openedPhotosState {
  value: number[],
}

const initialState: openedPhotosState = {
  value: [],
}

export const openedPhotosSlice = createSlice({
  name: 'openedPhotos',
  initialState,
  reducers: {
    setOpenedPhotos: (state, action: PayloadAction<number>) => {
        state.value.push(action.payload);
    },
  }
})

// Action creators are generated for each case reducer function
export const { setOpenedPhotos } = openedPhotosSlice.actions

export default openedPhotosSlice.reducer