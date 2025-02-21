import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface showImgState {
  value: boolean,
}

const initialState: showImgState = {
  value: false,
}

export const showImgSlice = createSlice({
  name: 'showImg',
  initialState,
  reducers: {
    setShowImg: (state) => {
        state.value = true;
    },
    resetShowImg: (state) => {
        state.value = false;
    },
    onImgClose: (state) => {},
  }
})

// Action creators are generated for each case reducer function
export const { setShowImg, resetShowImg, onImgClose } = showImgSlice.actions

export default showImgSlice.reducer