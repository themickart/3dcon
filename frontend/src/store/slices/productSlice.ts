import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/types';

interface IProductState {
    list: IProduct[];
    loading: boolean;
    error: string | null;
}

const initialState: IProductState = {
    list: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsFetching(state) {
            state.loading = true;
        },
        productsFetchingSuccess(
            state,
            { payload: { products } }: PayloadAction<{ products: IProduct[] }>
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
    },
});

export const {
    productsFetching,
    productsFetchingError,
    productsFetchingSuccess,
} = productSlice.actions;
export default productSlice.reducer;
