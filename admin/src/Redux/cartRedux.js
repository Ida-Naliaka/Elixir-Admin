import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProducttoCart: (state, action) => {
      const duplicate = state.products.some((p) => p._id === action.payload.id);

      if (duplicate) {
        const dupliItem = state.products.find(
          (e) => e._id === action.payload._id
        );
        const updatedProduct = {
          _id: action.payload._id,
          Title: action.payload.Title,
          Price: action.payload.Price,
          Quantity: dupliItem.Quantity + action.payload.Quantity,
          Total:
            action.payload.price *
            (dupliItem.quantity + action.payload.Quantity),
        };
        state.products.filter((p) => p._id !== action.payload._id);
        state.products.push(updatedProduct);
        let sum = 0;
        state.products.forEach((element) => {
          sum += element.Total;
        });
        state.total = sum;
      } else {
        let sum = 0;
        state.products.push(action.payload);
        state.products.forEach((element) => {
          sum += element.Total;
        });
        state.total = sum;
      }
    },
    removeProductfromCart: (state, action) => {
      state.products.filter((item) => item._id === action.payload);
      let sum = 0;
      state.products.forEach((element) => {
        sum += element.Total;
      });
      state.total = sum;
    },
  },
});

export const { addProducttoCart, removeProductfromCart } = cartSlice.actions;
export default cartSlice.reducer;
