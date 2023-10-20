import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { list } from "../data.js";

const initialState = {
  productsList: [...list],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      const itemToRemove = action.payload;
      state.productsList = state.productsList.filter(
        (item) => item.id !== itemToRemove
      );
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      state.productsList.push(newItem);
    },

    updateItem: (state, action) => {
      const updatedItem = action.payload;
      state.productsList = state.productsList.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    },
  
  },
});

export const { removeItem, addItem, updateItem } = mainSlice.actions;

export default mainSlice.reducer;
