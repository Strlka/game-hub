import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface sumsState {
  value: number[],
  sortValue: number[],
}

const initialState: sumsState = {
  value: [
    100, 50, 300000, 750, 10, 300, 1, 1000, 1000000, 200000, 500000, 5000,
    10000, 0.01, 75000, 75, 25000, 5, 500, 50000, 100000, 200, 750000, 400,
    25, 400000,
  ],
  sortValue: [
    100, 50, 300000, 750, 10, 300, 1, 1000, 1000000, 200000, 500000, 5000,
    10000, 0.01, 75000, 75, 25000, 5, 500, 50000, 100000, 200, 750000, 400,
    25, 400000,
  ].map(value => ({ value, sort: Math.random() }))
   .sort((a, b) => a.sort - b.sort)
   .map(({ value }) => value)
}

export const sumsSlice = createSlice({
  name: 'sums',
  initialState,
  reducers: {
    setSums: (state, action: PayloadAction<number[]>) => {
        state.value = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setSums } = sumsSlice.actions

export default sumsSlice.reducer