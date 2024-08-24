import { toast } from "sonner";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  success: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload.products : [];
      state.isLoading = true;
    });
    builder.addCase(getUserCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.error = null;
      const newProduct = action.payload.product;
      const productExistIndex = state.products.findIndex(
        (product) => product.id === newProduct.id
      );
      if (productExistIndex === -1) {
        state.products.push(newProduct);
      } else {
        state.products[productExistIndex] = newProduct;
      }
      state.success = action.payload.success;
      state.isLoading = false;
    });
    builder.addCase(addProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.error = null;
      const newProduct = action.payload.product;
      const productExistIndex = state.products.findIndex(
        (product) => product.id === newProduct.id
      );

      if (productExistIndex === -1) {
        state.error = { error: "این محصول در سبد خرید وجود ندارد" };
      } else {
        if (state.products[productExistIndex].count > 1) {
          state.products[productExistIndex] = newProduct;
        } else {
          state.products.splice(productExistIndex, 1);
        }
      }

      (state.success = action.payload.success), (state.isLoading = false);
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(removeProduct.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const getUserCart = createAsyncThunk("cart/getUserCart", async () => {
  const result = await fetch("/api/user-cart");
  const response = await result.json();
  return response;
});

export const addProduct = createAsyncThunk(
  "cart/addProduct",
  async (productId, thunkAPI) => {
    const result = await fetch("/api/user-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actionType: "ADD",
        productId,
      }),
    });
    console.log("send req", result);
    if (!result.ok) {
      toast.success("در ارتباط با سرور خطایی رخ داده است");
      return thunkAPI.rejectWithValue({
        error: "در ارتباط با سرور خطایی رخ داده است",
      });
    }
    const response = await result.json();

    if (response.error) {
      toast.success(response.error);
      return thunkAPI.rejectWithValue(response.error);
    } else if (response.success) {
      toast.success(response.success);
      return response;
    }
  }
);

export const removeProduct = createAsyncThunk(
  "cart/removeProduct",
  async (productId) => {
    const result = await fetch("/api/user-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actionType: "REMOVE",
        productId,
      }),
    });
    if (!result.ok) {
      toast.success("در ارتباط با سرور خطایی رخ داده است")

      return thunkAPI.rejectWithValue({
        error: "در ارتباط با سرور خطایی رخ داده است",
      });
    }
    const response = await result.json();
    console.log(response, " this is from addProduct to car");
    if (response.error) {
      toast.success(response.error)
      return thunkAPI.rejectWithValue(response);
    } else if (response.success) {
      toast.success(response.success);
      return response;
    }
  }
);

export default cartSlice;
export const cartSliceAction = cartSlice.actions;
