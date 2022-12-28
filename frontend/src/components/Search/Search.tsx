import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Search.module.scss';
import useDebounce from '../../hooks/debounce';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { productsFilter } from '../../store/slices/productSlice';

export const Search: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();
    const debounced = useDebounce<string>(value);

    useEffect(() => {
        dispatch(productsFilter(debounced));
    }, [debounced, dispatch])

    return (
        <div className={styles.container}>
            <motion.form
                className={styles.container__form}
                whileTap={{ scale: 0.9 }}
            >
                <input
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsVisible(true)}
                    onBlur={() => setIsVisible(false)}
                    type="text"
                    placeholder="Поиск"
                    className={styles.container__form__input}
                />
                <div className="flex-[0_0_31px]">
                    <img
                        src={process.env.PUBLIC_URL + '/header/search.svg'}
                        alt=""
                    />
                </div>
            </motion.form>
        </div>
    );
};
