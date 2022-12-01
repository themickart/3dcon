import { IModelInput } from '../components/ModelAdd/ModelAddForm';
import {
    modelAddingError,
    modelAddingSuccess,
    modelsFetching,
    modelsFetchingError,
    modelsFetchingSuccess,
    modelEditingError,
    modelEditingSuccess,
} from './slices/modelSlice';
import { AppDispatch } from './index';
import {
    productsFetching,
    productsFetchingError,
    productsFetchingSuccess,
} from './slices/productSlice';
import {
    productFetching,
    productFetchingError,
    productFetchingSuccess,
} from './slices/productDetailSlice';
import { loginSuccess } from './slices/authSlice';
import axios from '../axios';
import {
    IUserState as IUserResponse,
    userFetchingSuccess,
} from './slices/userSlice';
import { ILoginData, IProduct, IRegisterData } from '../types/types';
import { InputType } from '../components/Model/ModelCard';

export const fetchModels = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(modelsFetching());
        const models = (
            await axios.get<IProduct[]>('products/my', {
                headers: { Authorization: `Bearer ${token}` },
            })
        ).data;
        dispatch(
            modelsFetchingSuccess({
                models,
            })
        );
    } catch (error) {
        dispatch(modelsFetchingError(error as Error));
    }
};

export const addModel =
    (model: IProduct, data: IModelInput, token: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(modelAddingSuccess({ model }));
            console.log(
                (
                    await axios.post('products/upload', data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                ).data
            );
        } catch (error) {
            dispatch(modelAddingError(error as Error));
        }
    };

export const editModel =
    ({ id: payloadId, ...data }: InputType, token: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(modelEditingSuccess({ payloadId, ...data }));
            await axios.patch(
                `products/update`,
                { productId: payloadId, ...data },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            dispatch(modelEditingError(error as Error));
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

export const fetchProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productsFetching());
        dispatch(
            productsFetchingSuccess({
                products: (await axios.get<IProduct[]>('products')).data,
            })
        );
    } catch (error) {
        dispatch(productsFetchingError(error as Error));
    }
};

export const fetchProduct =
    (payloadId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(productFetching());
            dispatch(
                productFetchingSuccess({
                    product: (
                        await axios.get<IProduct>(`products/${payloadId}`)
                    ).data,
                })
            );
        } catch (error) {
            dispatch(productFetchingError(error as Error));
        }
    };

export const register =
    (data: IRegisterData) => async (dispatch: AppDispatch) => {
        try {
            const token = (await axios.post<string>('auth/join', data)).data;
            dispatch(loginSuccess({ token, username: data.username }));
        } catch (e) {
            console.log((e as Error).message);
        }
    };

export const login = (data: ILoginData) => async (dispatch: AppDispatch) => {
    try {
        const token = (await axios.post<string>('auth/login', data)).data;
        dispatch(loginSuccess({ token, username: data.username }));
    } catch (e) {
        console.log((e as Error).message);
    }
};

export const fetchUser = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(
            userFetchingSuccess(
                (
                    await axios.get<IUserResponse>('account/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                ).data
            )
        );
    } catch (e) {
        console.error((e as Error).message);
    }
};
