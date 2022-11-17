import {
  Model,
  modelAddingError,
  modelAddingSuccess,
  modelEditingSuccess,
} from "./slices/modelSlice";
import { AppDispatch } from "./index";
import axios from "../axios";
import {
  modelsFetching,
  modelsFetchingError,
  modelsFetchingSuccess,
  modelDeletingError,
  modelDeletingSuccess,
} from "./slices/modelSlice";
import {
  productsFetching,
  productsFetchingError,
  productsFetchingSuccess,
  productsFetchingWithoutOne,
  productsFetchingWithoutOneError,
  productsFetchingWithoutOneSuccess,
} from "./slices/productSlice";
import {
  productFetching,
  productFetchingError,
  productFetchingSuccess,
} from "./slices/productDetailSlice";
import { Product } from "../components/ProductCard/ProductCard";

export const fetchModels = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(modelsFetching());
    dispatch(
      modelsFetchingSuccess({
        models: (await axios.get<Model[]>("models")).data,
      })
    );
  } catch (error) {
    dispatch(modelsFetchingError(error as Error));
  }
};

export const addModel = (model: Model) => async (dispatch: AppDispatch) => {
  try {
    dispatch(modelAddingSuccess({ model }));
    await axios.post("models", model);
  } catch (error) {
    dispatch(modelAddingError(error as Error));
  }
};

export const deleteModel =
  (payloadId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(modelDeletingSuccess({ payloadId }));
      await axios.delete(`models/${payloadId}`);
    } catch (error) {
      dispatch(modelDeletingError(error as Error));
    }
  };

export const editModel =
  (category: string, price: string, title: string, payloadId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(modelEditingSuccess({ category, payloadId, price, title }));
      await axios.patch(`models/${payloadId}`, { category, title, price });
    } catch (error) {
      dispatch(modelDeletingError(error as Error));
    }
  };

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsFetching());
    dispatch(
      productsFetchingSuccess({
        products: (await axios.get<Product[]>("products")).data,
      })
    );
  } catch (error) {
    dispatch(productsFetchingError(error as Error));
  }
};

export const fetchProductsWithoutOne =
  (payloadId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetchingWithoutOne());
      dispatch(
        productsFetchingWithoutOneSuccess({
          products: (await axios.get<Product[]>(`products/?id_ne=${payloadId}`))
            .data,
        })
      );
    } catch (error) {
      dispatch(productsFetchingWithoutOneError(error as Error));
    }
  };

export const fetchProduct =
  (payloadId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productFetching());
      dispatch(
        productFetchingSuccess({
          product: (await axios.get<Product>(`products/${payloadId}`)).data,
        })
      );
    } catch (error) {
      dispatch(productFetchingError(error as Error));
    }
  };
