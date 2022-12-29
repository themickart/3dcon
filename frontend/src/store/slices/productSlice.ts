import { categories } from './../../constData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/types';

interface IProductState {
    list: IProduct[];
    cachedList: IProduct[];
    loading: boolean;
    error: string | null;
}

const initialState: IProductState = {
    list: [],
    cachedList: [],
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
            state.list = state.cachedList
                .filter((product) => (action.payload === "" || product.name.includes(action.payload))
                    || (action.payload === "" || product.category.includes(action.payload)));
        },
        productsSortByPrice(state, action: PayloadAction<boolean>) {
            state.list = state.cachedList.sort((a, b) => {
                const value = action.payload ? 1 : -1;
                return a.price > b.price ? value : a.price < b.price ? -value : 0
            })
        }
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
