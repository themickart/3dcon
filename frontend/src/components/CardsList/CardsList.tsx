import { useEffect, FC } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { motion } from 'framer-motion';
import styles from './CardsList.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchProducts } from '../../store/actionCreators/actionCreatorsProduct';
import { useSearchParams } from 'react-router-dom';

export const CardsList: FC<{ username?: string }> = ({ username }) => {
    const { list, error, loading } = useAppSelector(
        state => state.productReducer
    );
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        dispatch(fetchProducts(username, searchParams.get('cat')!));
    }, [dispatch, username, searchParams]);

    return (
        <div className={styles.wrapper}>
            {error ? (
                error
            ) : loading ? (
                'Загрузка...'
            ) : list?.length ? (
                list.map(({ id, ...product }) => (
                    <motion.div
                        key={id}
                        whileHover={{ scale: 1.05, marginBottom: 0 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: '0' }}
                        animate={{ y: 20 }}
                    >
                        <ProductCard id={id} {...product} />
                    </motion.div>
                ))
            ) : (
                <>Пока здесь ничего нет 😢</>
            )}
        </div>
    );
};
