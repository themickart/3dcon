import { categories } from './../../constData';
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
        },
        productsSortByPrice(state, action: PayloadAction<boolean>) {
            state.list = state.cachedList.sort((a, b) => {
                const value = action.payload ? 1 : -1;
                return a.price > b.price
                    ? value
                    : a.price < b.price
                    ? -value
                    : 0;
            });
        },
    },
});

export const {
    productsFetching,
    productsFetchingError,
    productsFetchingSuccess,
    productsFilter,
    productsSortByPrice,
} = productSlice.actions;

export default productSlice.reducer;
