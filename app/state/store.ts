import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categories/categories";
import modifyItemReducer from "./modify/modifyItem";
import productImageReducer from "./images/images";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    modifyItem: modifyItemReducer,
    productImage: productImageReducer,
  },
});

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
