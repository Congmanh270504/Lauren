import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { prisma } from "@/utils/prisma";
import { PrismaClient } from "@prisma/client";

interface CategoryProps {
  id: string;
  categoryName: string;
}

const initialState: CategoryProps[] = [];

// Create a thunk action to fetch category data
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const data = await prisma.category.findMany();
    console.log("Fetched data:", data); // Log the fetched data
    return data;
  }
);
async function getData() {
  const prisma = new PrismaClient();
  const data = await prisma.category.findMany();
  return data;
} // Create a slice

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
