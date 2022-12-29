import React from 'react';
import { categories } from '../../constData';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { productsFilter, productsSortByPrice } from '../../store/slices/productSlice';
import styles from './Sortbar.module.scss';

export const Sortbar: React.FC<{ params: string[] }> = ({ params }) => {
    const dispatch = useAppDispatch();

    const selectHandler = (e: any) => {
        dispatch(productsFilter(e.target.value));
    }

    const sortHandler = (flag: boolean) => {
        dispatch(productsSortByPrice(flag));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper__options}>
                <p>Цена</p>
                <div>
                    <button onClick={() => sortHandler(true)}>+</button>
                    <button onClick={() => sortHandler(false)}>-</button>
                </div>
                <p>Формат</p>
            </div>
            <div>
                <select
                    id="categories"
                    onChange={(e) => selectHandler(e)}
                >
                    <option value="">Категории</option>
                    {categories.map(c => (
                        <option key={"__key__" + c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
