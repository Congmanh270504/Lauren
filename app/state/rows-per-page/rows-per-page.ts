import { createSlice } from "@reduxjs/toolkit";
interface RowPerPageProps {
  rowPerPage: number;
}
const initialState: RowPerPageProps = {
  rowPerPage: 10,
};
export const rowsPerPageSlice = createSlice({
  name: "rowsPerPage",
  initialState,
  reducers: {
    setRowPerPage: (state, action) => {
      state.rowPerPage = action.payload;
    },
  },
});
// Export the reducer, which will be used in the store
export const { setRowPerPage } = rowsPerPageSlice.actions;
export default rowsPerPageSlice.reducer;
