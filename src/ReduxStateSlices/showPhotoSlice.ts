import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface showPhotoState {
  value: number | null,
}

const initialState: showPhotoState = {
  value: null,
}

export const showPhotoSlice = createSlice({
  name: 'showPhoto',
  initialState,
  reducers: {
    setShowPhoto: (state, action: PayloadAction<number | null>) => {
        state.value = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setShowPhoto } = showPhotoSlice.actions

export default showPhotoSlice.reducer