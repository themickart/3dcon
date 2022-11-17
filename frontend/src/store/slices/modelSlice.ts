import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Model {
  id: string;
  title: string;
  imgUrl: string;
  category: string;
  price: string;
  sales: string;
  views: string;
}

interface IModelState {
  list: Model[];
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
      { payload: { models } }: PayloadAction<{ models: Model[] }>
    ) {
      state.error = null;
      state.list = models;
      state.loading = false;
    },
    modelsFetchingError(state, { payload: { message } }: PayloadAction<Error>) {
      state.loading = false;
      state.error = message;
    },
    modelAddingSuccess(
      state,
      { payload: { model } }: PayloadAction<{ model: Model }>
    ) {
      state.list.push(model);
    },
    modelAddingError(state, { payload: { message } }: PayloadAction<Error>) {
      state.error = message;
      state.loading = false;
    },
    modelDeletingSuccess(
      state,
      { payload: { payloadId } }: PayloadAction<{ payloadId: string }>
    ) {
      state.list = state.list.filter(({ id }) => id !== payloadId);
      state.error = null;
    },
    modelDeletingError(state, { payload: { message } }: PayloadAction<Error>) {
      state.loading = false;
      state.error = message;
    },
    modelEditingSuccess(
      state,
      {
        payload: { category, price, title, payloadId },
      }: PayloadAction<{
        title: string;
        category: string;
        price: string;
        payloadId: string;
      }>
    ) {
      const model = state.list.find(({ id }) => id === payloadId) as Model;
      model.category = category;
      model.price = price;
      model.title = title;
    },
    modelEditingError(state, { payload: { message } }: PayloadAction<Error>) {
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
