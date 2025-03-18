import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { prisma } from "@/utils/prisma";
import { PrismaClient } from "@prisma/client";
import { categoryType } from "@/types/itemTypes";

const initialState: categoryType[] = [];

// Create a thunk action to fetch category data
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    console.log("Fetched data:", data); // Log the fetched data
    return data;
  }
);


export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      return state.filter((cat) => cat.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// Export the action creators
export const { setCategory, addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;
// Export the reducer
export default categorySlice.reducer;
