import { Modal } from 'antd';
import { FC, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { InputType } from './ModelCard';
import ModelContext from './ModelContext';
import { editModel } from "../../store/actionCreators/actionCreatorsProduct";

export const ModelInfoEdit: FC<InputType> = ({ category, id, name, price }) => {
    const dispatch = useAppDispatch();
    const [isVisibleForm, setIsVisibleForm] = useContext(ModelContext);
    const { token } = useAppSelector(state => state.authReducer);
    const { register, handleSubmit } = useForm<InputType>({
        defaultValues: { id, category, name, price },
    });

    const onSubmit: SubmitHandler<InputType> = ({ price, ...data }) => {
        // hm, price is string without using '+' and query's ruined, but ts say it's number...
        // if price is zero, also query's ruined
        dispatch(editModel({ price: +price, ...data }, token));
    };

    return (
        <Modal
            footer={null}
            open={isVisibleForm}
            onCancel={() => setIsVisibleForm(false)}
        >
            <form
                className="h-[100%] w-[45%] flex flex-col justify-around border"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className="border rounded-xl mx-3 text-center"
                    type="text"
                    placeholder="Название"
                    defaultValue={name}
                    {...register('name', { required: true })}
                />
                <input
                    className="border rounded-xl mx-3 text-center"
                    type="text"
                    placeholder="Категория"
                    defaultValue={category}
                    {...register('category', { required: true })}
                />
                <input
                    className="border rounded-xl mx-3 text-center"
                    type="number"
                    placeholder="Цена"
                    {...register('price')}
                />
                <button
                    type="submit"
                    className="border rounded-xl mx-3 hover:bg-[#469fda]"
                    onClick={() => setIsVisibleForm(false)}
                >
                    Сохранить
                </button>
            </form>
        </Modal>
    );
};
