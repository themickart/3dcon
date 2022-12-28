import axios from '../../axios';
import { InputType } from '../../components/Model/ModelCard';
import { IModelInput } from '../../components/ModelAdd/ModelAddForm';
import { IProduct } from '../../types/types';
import { AppDispatch } from '../index';
import {
    modelAddingError,
    modelAddingSuccess,
    modelDeletingError,
    modelDeletingSuccess,
    modelEditingError,
    modelEditingSuccess,
    modelsFetching,
    modelsFetchingError,
    modelsFetchingSuccess,
} from '../slices/modelSlice';
import {
    productFetching,
    productFetchingError,
    productFetchingSuccess,
} from '../slices/productDetailSlice';
import {
    productsFetching,
    productsFetchingError,
    productsFetchingSuccess,
    productsFilter,
} from '../slices/productSlice';

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
                await axios.post('products/upload', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                dispatch(fetchModels(token));
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
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                dispatch(modelEditingError(error as Error));
            }
        };

export const deleteModelById =
    (payloadId: number, token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(modelDeletingSuccess({ payloadId }));
            await axios.delete(`products/${payloadId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            dispatch(modelDeletingError(error as Error));
        }
    };

export const fetchProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productsFetching());
        dispatch(
            productsFetchingSuccess({
                products: (
                    await axios.get<IProduct[]>('products?offset=0&limit=10')
                ).data,
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

