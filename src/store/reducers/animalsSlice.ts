import { createSlice } from '@reduxjs/toolkit';

export type animalType = {
  name: string,
  image: string,
  species: string,
}

export const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    animalsData: [] as animalType[],
    animalsSpecies: [] as string[],
  },
  reducers: {
    add: (state, action) => {
      state.animalsData = [...state.animalsData, action.payload];
    },
    push: (state, action) => {
      state.animalsSpecies = [...state.animalsSpecies, action.payload];
    },
    remove: (state, action) => {
      state.animalsData.splice(action.payload, 1);
    },
  },
});

export const { add, push, remove } = animalsSlice.actions;

export default animalsSlice.reducer;
