import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/types';

interface IProductState {
    list: IProduct[];
    cachedList: IProduct[];
    // isNotFound: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: IProductState = {
    list: [],
    cachedList: [],
    // isNotFound: false,
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
            state.cachedList = [...products];
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
        productsFilter(state, action: PayloadAction<string>) {
            state.list = state.cachedList.filter(product =>
                product.name
                    .toLowerCase()
                    .startsWith(action.payload.toLowerCase())
            );
        }
    },
});

export const {
    productsFetching,
    productsFetchingError,
    productsFetchingSuccess,
    productsFilter,
} = productSlice.actions;

export default productSlice.reducer;
