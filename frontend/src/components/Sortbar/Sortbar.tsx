import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TupleType } from 'typescript';
import { categories } from '../../constData';
import { useAppDispatch } from '../../hooks/reduxHooks';
import {
    productsFilter,
    productsSortByPrice,
} from '../../store/slices/productSlice';
import styles from './Sortbar.module.scss';

interface ISortInput {
    rating: '' | 'up' | 'desc';
    price?: '' | 'up' | 'desc';
    // category: keyof categories;
}

export const Sortbar: React.FC<{ params: string[] }> = ({ params }) => {
    const dispatch = useAppDispatch();

    const selectHandler = (e: any) => {
        dispatch(productsFilter(e.target.value));
    };

    const sortHandler = (flag: boolean) => {
        dispatch(productsSortByPrice(flag));
    };

    const { register, reset, handleSubmit } = useForm<ISortInput>();
    const onSubmit: SubmitHandler<ISortInput> = ({ rating, price }) => {};
    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
            {/* <div className={styles.wrapper__options}>
                <p>Цена</p>
                <div>
                    <button onClick={() => sortHandler(true)}>+</button>
                    <button onClick={() => sortHandler(false)}>-</button>
                </div>
                <p>Формат</p>
            </div>
            <div>
                <select id="categories" onChange={e => selectHandler(e)}>
                    <option value="">Категории</option>
                    {categories.map(c => (
                        <option key={'__key__' + c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div> */}
            <div>Сортировать по:</div>
            <select id="rating" {...register('rating')}>
                <option value="">Рейтинг</option>
                <option value="up">Р+</option>
                <option value="desc">Р-</option>
            </select>
            <select id="price" {...register('price')}>
                <option value="">Цена</option>
                <option value="up">Ц+</option>
                <option value="desc">Ц-</option>
            </select>
            <select id="category">
                <option value="">Категории</option>
                {categories.map(({ title }) => (
                    <option key={title}>{title}</option>
                ))}
            </select>
            <button onClick={() => reset()}>Отменить</button>
            <button type="submit">Применить</button>
        </form>
    );
};
