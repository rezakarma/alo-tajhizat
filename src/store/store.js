import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products-slice";
import profileEditModalSlice from "./profileEditModal-slice";
import editAddProduct from "./editProduct-slice";
import profileSlice from "./profile-slice";
import uiSlice from "./ui-slice";
import filteringSlice from "./filtering-slice";
import categoryListSlice from "./categoryList-slice";
import cartSlice from "./cart-slice";
import dragAndDropSlice from "./drandAndDrop-slice";
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    profileEditModal: profileEditModalSlice.reducer,
    editProductSlice: editAddProduct.reducer,
    profile: profileSlice.reducer,
    ui: uiSlice.reducer,
    filtering: filteringSlice.reducer,
    categoryList: categoryListSlice.reducer,
    cart: cartSlice.reducer,
    dragAndDrop: dragAndDropSlice.reducer,
  },
});

export default store;
