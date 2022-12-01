import { useContext, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import context from './ModelAddContext';
import { IProduct } from '../../types/types';
import { addModel } from '../../store/actionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Modal } from 'antd';

export interface IModelInput {
    name: string;
    description: string;
    cover: File;
    license: string;
    price: number;
}

const ModelAddForm = () => {
    const { register, handleSubmit, reset, setValue } = useForm<IModelInput>();
    const [isShow, setIsShow] = useContext(context);
    const token = useAppSelector(state => state.authReducer.token);
    const pickCoverUrlRef = useRef<HTMLInputElement>(null);
    const { avatarArl, reputation, salesCount } = useAppSelector(
        state => state.userReducer
    );
    const { username } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<IModelInput> = ({
        cover,
        description,
        license,
        name,
        price,
    }) => {
        const product: IProduct = {
            author: { avatarArl, reputation, salesCount, name: username },
            createdAt: new Date().toISOString(),
            isLiked: false,
            isViewed: false,
            gallery: [],
            tags: [],
            likesCount: 0,
            viewsCount: 0,
            info: {},
            category: '',
            name,
            coverUrl: cover.name,
            description,
            license,
            price,
        };
        const data: IModelInput = { name, cover, description, license, price };
        console.log(cover);
        console.log(product);
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
                    title="Добавление модели"
                    footer={null}
                    onCancel={() => setIsShow(false)}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name">Название</label>
                        <input type="text" id="name" {...register('name')} />
                        <label htmlFor="description">Описание</label>
                        <input
                            type="text"
                            id="desrciption"
                            {...register('description')}
                        />
                        <label htmlFor="license">Тип лицензии</label>
                        <input
                            type="text"
                            id="license"
                            {...register('license')}
                        />
                        <label htmlFor="price">Цена</label>
                        <input
                            type="number"
                            id="price"
                            {...register('price')}
                        />
                        <div
                            className="cursor-pointer"
                            onClick={() => pickCoverUrlRef.current!.click()}
                        >
                            Прикрепить главное изображение
                        </div>
                        <input
                            className="w-0 h-0 m-0 p-0 opacity-0 overflow-hidden"
                            type="file"
                            ref={pickCoverUrlRef}
                            onChange={handleChange}
                            accept="image/*,.png,.jpg,.gif,.web"
                        />
                        <div></div>
                        <button type="submit">Добавить</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default ModelAddForm;

// БАГ! - при переходе /profile вылезает модальное окно
