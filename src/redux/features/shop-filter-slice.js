import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterSidebar: false,
};

export const shopFilterSlice = createSlice({
  name: "shopFilter",
  initialState,
  reducers: {
    handleFilterSidebarOpen: (state) => {
      state.filterSidebar = true;
    },
    handleFilterSidebarClose: (state) => {
      state.filterSidebar = false;
    },
  },
});

export const { handleFilterSidebarOpen, handleFilterSidebarClose } =
  shopFilterSlice.actions;
export default shopFilterSlice.reducer;
