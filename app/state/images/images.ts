import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { imagesTpye } from "@/types/itemTypes";
const initImageState: imagesTpye[] = [];

const imageSlice = createSlice({
  name: "images",
  initialState: initImageState,
  reducers: {
    setImages: (state, action) => {
      return action.payload;
    },
    addImage: (state, action) => {
      state.push(action.payload);
    },
    deleteImage: (state, action) => {
      return state.filter((img) => img.id !== action.payload.id);
    },
  },
});

export const { setImages, addImage, deleteImage } = imageSlice.actions;
export default imageSlice.reducer;
