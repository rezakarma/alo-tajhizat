import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products-slice"
import profileEditModalSlice from "./profileEditModal-slice";
import editAddProduct from "./editProduct-slice"
import profileSlice from "./profile-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { products: productsSlice.reducer, profileEditModal: profileEditModalSlice.reducer,editProductSlice:editAddProduct.reducer, profile: profileSlice.reducer, ui: uiSlice.reducer },
})

export default store;