import { useContext, useRef } from 'react';
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
    const { register, handleSubmit, reset, setValue } = useForm<IModelInput>();
    const [isShow, setIsShow] = useContext(context);
    const pickCoverUrlRef = useRef<HTMLInputElement>(null);
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
        reset();
        setIsShow(false);
    };

    interface Event<T = EventTarget> {
        target: T;
    }

    const handleChange = (e: Event<HTMLInputElement>) => {
        setValue('cover', e.target.files?.[0]!);
    };

    return (
        <div className="wrapper">
            <div className="modal">
                <Modal
                    open={isShow}
                    title="???????????????????? ????????????"
                    footer={null}
                    onCancel={() => setIsShow(false)}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name">????????????????</label>
                        <input type="text" id="name" {...register('name')} />
                        <label htmlFor="description">????????????????</label>
                        <input
                            type="text"
                            id="desrciption"
                            {...register('description')}
                        />
                        <label htmlFor="license">?????? ????????????????</label>
                        <input
                            type="text"
                            id="license"
                            {...register('license')}
                        />
                        <label htmlFor="price">????????</label>
                        <input
                            type="number"
                            id="price"
                            {...register('price')}
                        />
                        <label htmlFor="category">??????????????????</label>
                        <select
                            id="category"
                            className="mb-[20px] m-[10px]"
                            {...register('category')}
                        >
                            <option value="">?????????????? ??????????????????</option>
                            {categories.map(({ title }) => (
                                <option key={'__key__' + title} value={title}>
                                    {title}
                                </option>
                            ))}
                        </select>
                        <div
                            className="cursor-pointer"
                            onClick={() => pickCoverUrlRef.current!.click()}
                        >
                            ???????????????????? ?????????????? ??????????????????????
                        </div>
                        <input
                            className="w-0 h-0 m-0 p-0 opacity-0 overflow-hidden"
                            type="file"
                            ref={pickCoverUrlRef}
                            onChange={handleChange}
                            accept="image/*,.png,.jpg,.gif,.web"
                        />
                        <button type="submit">????????????????</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default ModelAddForm;
