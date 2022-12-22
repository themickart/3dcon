import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/types';

interface IProductDetailState {
    product: IProduct;
    error: string | null;
    loading: boolean;
}

const initialState: IProductDetailState = {
    product: {} as IProduct,
    error: null,
    loading: false
};

const productDetailSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productFetching(state) {
            state.loading = true;
        },
        productFetchingSuccess(
            state,
            { payload: { product } }: PayloadAction<{ product: IProduct }>
        ) {
            state.product = product;
            state.loading = false;
            state.error = null;
        },
        productFetchingError(
            state,
            { payload: { message } }: PayloadAction<Error>
        ) {
            state.error = message;
            state.loading = false;
        }
    },
});

export const { productFetching, productFetchingError, productFetchingSuccess } =
    productDetailSlice.actions;
export default productDetailSlice.reducer;
