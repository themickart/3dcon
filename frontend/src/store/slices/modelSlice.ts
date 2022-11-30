
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/types";

interface IModelState {
	list: IProduct[];
	loading: boolean;
	error: string | null;
}

const initialState: IModelState = {
	list: [],
	loading: false,
	error: null,
};

const modelSlice = createSlice({
	name: "model",
	initialState,
	reducers: {
		modelsFetching(state) {
			state.loading = true;
		},
		modelsFetchingSuccess(
			state,
			{payload: {models}}: PayloadAction<{ models: IProduct[] }>
		) {
			state.error = null;
			state.list = models;
			state.loading = false;
		},
		modelsFetchingError(state, {payload: {message}}: PayloadAction<Error>) {
			state.loading = false;
			state.error = message;
		},
		modelAddingSuccess(
			state,
			{payload: {model}}: PayloadAction<{ model: IProduct }>
		) {
			state.list.push(model);
		},
		modelAddingError(state, {payload: {message}}: PayloadAction<Error>) {
			state.error = message;
			state.loading = false;
		},
		modelDeletingSuccess(
			state,
			{payload: {payloadId}}: PayloadAction<{ payloadId: number }>
		) {
			state.list = state.list.filter(({id}) => id !== payloadId);
			state.error = null;
		},
		modelDeletingError(state, {payload: {message}}: PayloadAction<Error>) {
			state.loading = false;
			state.error = message;
		},
		modelEditingSuccess(
			state,
			{
				payload: {category, price, name, payloadId},
			}: PayloadAction<{
				name: string;
				category: string;
				price: number;
				payloadId: number;
			}>
		) {
			const model = state.list.find(({id}) => id === payloadId) as IProduct;
			model.category = category;
			model.price = price;
			model.name = name;
		},
		modelEditingError(state, {payload: {message}}: PayloadAction<Error>) {
			state.error = message;
		},
	},
});

export const {
	modelsFetching,
	modelsFetchingError,
	modelsFetchingSuccess,
	modelDeletingError,
	modelDeletingSuccess,
	modelEditingError,
	modelEditingSuccess,
	modelAddingError,
	modelAddingSuccess,
} = modelSlice.actions;
export default modelSlice.reducer;
