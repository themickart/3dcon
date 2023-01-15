import { Modal } from 'antd';
import { FC, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { InputType } from './ModelCard';
import ModelContext from './ModelContext';
import { editModel } from "../../store/actionCreators/actionCreatorsProduct";
import { categories } from '../../constData';

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
            width={950}
        >
            <div className={'w-full px-[140px] pt-7 pb-[53px]'}>
                <h1 className="text-center text-[32px]">
                    Редактирование проекта
                </h1>
                <form
                    className={'flex flex-col items-center mt-6'}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        type="text"
                        {...register('name')}
                        placeholder={'Название'}
                        className={
                            'w-[670px] h-[69px] rounded-[71px] text-xl outline outline-1 outline-[#D9D9D9] pl-9 mb-[15px]'
                        }
                    />
                    <select
                        className="mb-[15px] text-xl outline outline-1 outline-[#D9D9D9] w-[670px] h-[69px] rounded-[71px] px-9 appearance-none"
                        {...register('category')}
                    >
                        {categories.map(({ title }) => (
                            <option key={title} value={title}>
                                {title}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Цена"
                        {...register('price', { required: true })}
                        className="w-[670px] flex justify-between mb-[15px] h-[69px] rounded-[71px] outline outline-1 outline-[#D9D9D9] pl-9 text-xl"
                    />
                    <button
                        type="submit"
                        className="text-xl rounded-[25px] w-[300px] h-[40px] mt-8"
                        style={{ background: '#80E0A1' }}
                    >
                        Сохранить
                    </button>
                </form>
            </div>
        </Modal>
    );
};
