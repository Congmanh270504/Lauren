import { createSlice } from "@reduxjs/toolkit";
interface DeleteCheckedProps {
  id: string;
  checked: boolean;
}
const initialState: DeleteCheckedProps[] = [];
export const deleteCheckedSlice = createSlice({
  name: "deleteChecked",
  initialState,
  reducers: {
    setDeleteChecked: (state, action) => {
      const { id, checked } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem && checked === false) {
        return state.filter((item) => item.id !== existingItem.id);
      } else {
        state.push({ id, checked });
      }
    },
    clearDeleteChecked: (state) => {
      return initialState;
    },
    checkAll: (state, action) => {
      const { checked } = action.payload;
      state.forEach((item) => {
        item.checked = checked;
      });
    },
  },
});
export const { setDeleteChecked, clearDeleteChecked, checkAll } =
  deleteCheckedSlice.actions;
export default deleteCheckedSlice.reducer;
