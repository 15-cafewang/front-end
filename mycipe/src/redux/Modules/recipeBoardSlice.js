import { createSlice } from "@reduxjs/toolkit";

import { addRecipePostDB } from "../Async/recipeBoard";

// initialstate
const initialstate = {
  isfetching: false,
};

const recipeBoardSlice = createSlice({
  name: "recipeBoard",
  initialState: initialstate,
  reducers: {},
  extraReducers: {
    // 레시피 작성
    [addRecipePostDB.pending]: (state, action) => {
      state.isfetching = true;
    },
    [addRecipePostDB.fulfilled]: (state, action) => {
      state.isfetching = false;
    },
    [addRecipePostDB.rejected]: (state, action) => {
      state.isfetching = true;
    },
  },
});

export default recipeBoardSlice;
