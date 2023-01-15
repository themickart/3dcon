import { SyntheticEvent, useContext, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IProduct } from '../../types/types';
import context from './ModelAddContext';

import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addModel } from '../../store/actionCreators/actionCreatorsProduct';
import { categories } from '../../constData';

export interface IModelInput {
    name: string;
    description: string;
    cover: File;
    license: string;
    price: number;
    category: string;
}

const ModelAddForm = () => {
    const [fileUploaded, setFileUploaded] = useState(false);
    const { register, handleSubmit, setValue, getValues, resetField } =
        useForm<IModelInput>();
    const [isShow, setIsShow] = useContext(context);
    const pickCoverUrlRef = useRef<HTMLInputElement>(null);
    const cancelPickCoverUrlRef = useRef<HTMLButtonElement>(null);
    const user = useAppSelector(state => state.userReducer);
    const { username, token } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<IModelInput> = ({
        cover,
        description,
        license,
        name,
        price,
        category,
    }) => {
        const product: IProduct = {
            author: {
                ...user,
                name: username,
            },
            gallery: [],
            tags: [],
            likesCount: 0,
            viewsCount: 0,
            info: {},
            category,
            name,
            coverUrl: cover.name,
            description,
            license,
            price,
        };
        const data: IModelInput = {
            name,
            cover,
            description,
            license,
            price,
            category,
        };
        dispatch(addModel(product, data, token));
        setIsShow(false);
        (
            Object.keys(data) as (
                | 'cover'
                | 'category'
                | 'description'
                | 'license'
                | 'price'
                | 'name'
            )[]
        ).forEach(field => field !== 'category' && resetField(field));
        cancelPickCoverUrlRef?.current?.click();
    };

    interface Event<T = EventTarget> {
        target: T;
    }

    const handleChange = (e: Event<HTMLInputElement>) => {
        setValue('cover', e.target.files?.[0]!);
        setFileUploaded(true);
    };

    const dragEnterHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const dragLeaveHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const dropHandler = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setValue('cover', e.dataTransfer?.files[0]!);
        setFileUploaded(true);
    };

    return (
        <div className="wrapper">
            <div className="modal">
                <Modal
                    open={isShow}
                    footer={null}
                    onCancel={() => setIsShow(false)}
                    width={950}
                >
                    <div className={'w-full px-[140px] pt-7 pb-[53px]'}>
                        <h1 className="text-center text-[32px]">
                            Загрузка проекта
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={'flex flex-col items-center mt-6'}
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
                            <fieldset className="w-[670px] flex justify-between mb-[15px]">
                                <input
                                    type="text"
                                    placeholder="Лицензия"
                                    {...register('license', { required: true })}
                                    className={
                                        'w-[340px] h-[69px] rounded-[71px] outline outline-1 outline-[#D9D9D9] pl-9 text-xl'
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="Цена"
                                    {...register('price', { required: true })}
                                    className={
                                        'w-[320px] h-[69px] rounded-[71px] outline outline-1 outline-[#D9D9D9] pl-9 text-xl'
                                    }
                                />
                            </fieldset>
                            <textarea
                                {...register('description')}
                                placeholder={'Описание'}
                                className={
                                    'w-[670px] h-[174px] rounded-[25px] pl-9 pt-4 text-xl outline outline-1 outline-[#D9D9D9] mb-[15px]'
                                }
                            />
                            <div
                                className="w-[670px] h-[195px] rounded-[20px] bg-[#D9D9D9] pt-[5px] px-[6px] mb-[15px] cursor-pointer"
                                style={{
                                    boxShadow:
                                        '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                <div
                                    className="w-[656px] h-[153px] bg-[#FFFFFF] rounded-[20px] flex justify-center items-center"
                                    onDragEnter={dragEnterHandler}
                                    onDragLeave={dragLeaveHandler}
                                    onDragOver={dragEnterHandler}
                                    onDrop={dropHandler}
                                >
                                    {!fileUploaded ? (
                                        <img
                                            src={
                                                process.env.PUBLIC_URL +
                                                '/icons/upload.svg'
                                            }
                                            alt=""
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src={URL.createObjectURL(
                                                    getValues('cover')
                                                )}
                                                alt=""
                                                width="200"
                                                className="rounded-3xl"
                                            />
                                            <button
                                                className="text-red-500 text-xl font-bold self-start"
                                                onClick={() => {
                                                    setFileUploaded(false);
                                                    resetField('cover');
                                                }}
                                                ref={cancelPickCoverUrlRef}
                                            >
                                                &times;
                                            </button>
                                        </>
                                    )}
                                </div>
                                <p
                                    className="text-[15px] text-[#BFBFBF] text-center mt-2"
                                    onClick={() =>
                                        pickCoverUrlRef.current?.click()
                                    }
                                >
                                    Прикрепите файл или выберите его на
                                    устройстве
                                </p>
                            </div>
                            <input
                                className="w-0 h-0 m-0 p-0 opacity-0 overflow-hidden"
                                type="file"
                                ref={pickCoverUrlRef}
                                onChange={handleChange}
                                accept="image/*,.png,.jpg,.gif,.web"
                            />
                            <button
                                type="submit"
                                className="text-xl rounded-[25px] w-[300px] h-[40px] mt-8"
                                style={{ background: '#80E0A1' }}
                            >
                                Загрузить
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ModelAddForm;
