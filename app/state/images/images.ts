import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { productImageType } from "@/types/itemTypes";
const initImageState: productImageType[] = [];

export const fetchProductImage = createAsyncThunk(
  "image/fetchProductImage",
  async (id: string) => {
    const response = await fetch(`/api/product/images/${id}`);
    const data = await response.json();
    return data;
  }
);
const imageSlice = createSlice({
  name: "images",
  initialState: initImageState,
  reducers: {
    setImage: (state, action) => {
      return action.payload;
    },
    addImage: (state, action) => {
      state.push(action.payload);
    },
    deleteImage: (state, action) => {
      return state.filter((img) => img.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductImage.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setImage, addImage, deleteImage } = imageSlice.actions;
export default imageSlice.reducer;
