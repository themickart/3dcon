import { IRegisterData } from "./../routes/RegisterPage";
import { ILoginData } from "./../routes/LoginPage";
import {
  modelAddingError,
  modelAddingSuccess,
  // modelEditingSuccess,
} from "./slices/modelSlice";
import { AppDispatch } from "./index";
import {
  modelsFetching,
  modelsFetchingError,
  modelsFetchingSuccess,
  // modelDeletingError,
  // modelDeletingSuccess,
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
import { IProduct } from "../components/ProductCard/ProductCard";
import { loginSuccess } from "./slices/authSlice";
import axios from "../axios";
import { IUserState, userFetchingSuccess } from "./slices/userSlice";

export const fetchModels = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(modelsFetching());
    dispatch(
      modelsFetchingSuccess({
        models: (
          await axios.get<IProduct[]>("products/my", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ).data,
      })
    );
  } catch (error) {
    dispatch(modelsFetchingError(error as Error));
  }
};

export const addModel =
  (model: IProduct, token: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(modelAddingSuccess({ model }));
      await axios.post("products/upload", model, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      dispatch(modelAddingError(error as Error));
    }
  };

// export const deleteModel =
//   (payloadId: number) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(modelDeletingSuccess({ payloadId }));
//       await axios.delete(`http://localhost:8080/products/${payloadId}`);
//     } catch (error) {
//       dispatch(modelDeletingError(error as Error));
//     }
//   };

// export const editModel =
//   (category: string, price: number, name: string, payloadId: number) =>
//   async (dispatch: AppDispatch) => {
//     try {
//       dispatch(modelEditingSuccess({ category, payloadId, price, name }));
//       await axios.patch(`models/${payloadId}`, { category, name, price });
//     } catch (error) {
//       dispatch(modelDeletingError(error as Error));
//     }
//   };

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsFetching());
    dispatch(
      productsFetchingSuccess({
        products: (await axios.get<IProduct[]>("products")).data,
      })
    );
  } catch (error) {
    dispatch(productsFetchingError(error as Error));
  }
};

export const fetchProductsWithoutOne =
  (payloadId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetchingWithoutOne());
      dispatch(
        productsFetchingWithoutOneSuccess({
          products: (
            await axios.get<IProduct[]>(`products/?id_ne=${payloadId}`)
          ).data,
        })
      );
    } catch (error) {
      dispatch(productsFetchingWithoutOneError(error as Error));
    }
  };

export const fetchProduct =
  (payloadId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(productFetching());
      dispatch(
        productFetchingSuccess({
          product: (await axios.get<IProduct>(`products/${payloadId}`)).data,
        })
      );
    } catch (error) {
      dispatch(productFetchingError(error as Error));
    }
  };

export const register =
  (data: IRegisterData) => async (dispatch: AppDispatch) => {
    try {
      const token = (await axios.post<string>("auth/join", data)).data;
      dispatch(loginSuccess({ token, username: data.username }));
    } catch (e) {
      console.log((e as Error).message);
    }
  };

export const login = (data: ILoginData) => async (dispatch: AppDispatch) => {
  try {
    const token = (await axios.post<string>("auth/login", data)).data;
    dispatch(loginSuccess({ token, username: data.username }));
  } catch (e) {
    console.log((e as Error).message);
  }
};

interface IUserResponse extends IUserState {}

export const fetchUser = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(
      userFetchingSuccess(
        (
          await axios.get<IUserResponse>("account/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ).data
      )
    );
  } catch (e) {
    console.error((e as Error).message);
  }
};
