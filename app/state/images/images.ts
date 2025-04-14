import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProductsImages } from "@/app/action/products";

interface imagesTpyePops {
  id: string;
  url: string;
}
const initImageState: imagesTpyePops[] = [];

// Async thunk to fetch initial images
export const fetchInitialImages = createAsyncThunk(
  "images/fetchInitialImages",
  async () => {
    const images = await getAllProductsImages();
    return images;
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState: initImageState,
  reducers: {
    setImages: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialImages.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setImages } = imageSlice.actions;
export default imageSlice.reducer;
