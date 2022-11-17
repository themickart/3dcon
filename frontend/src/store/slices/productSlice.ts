import { Product } from "../../components/ProductCard/ProductCard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: IProductState = {
  list: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsFetching(state) {
      state.loading = true;
    },
    productsFetchingSuccess(
      state,
      { payload: { products } }: PayloadAction<{ products: Product[] }>
    ) {
      state.list = products;
      state.error = null;
      state.loading = false;
    },
    productsFetchingError(
      state,
      { payload: { message } }: PayloadAction<Error>
    ) {
      state.error = message;
      state.loading = false;
    },
    productsFetchingWithoutOne(state) {
      state.loading = true;
    },
    productsFetchingWithoutOneSuccess(
      state,
      { payload: { products } }: PayloadAction<{ products: Product[] }>
    ) {
      state.list = products;
      state.loading = false;
      state.error = null;
    },
    productsFetchingWithoutOneError(
      state,
      { payload: { message } }: PayloadAction<Error>
    ) {
      state.error = message;
      state.loading = false;
    },
  },
});

export const {
  productsFetching,
  productsFetchingError,
  productsFetchingSuccess,
  productsFetchingWithoutOne,
  productsFetchingWithoutOneError,
  productsFetchingWithoutOneSuccess,
} = productSlice.actions;
export default productSlice.reducer;
