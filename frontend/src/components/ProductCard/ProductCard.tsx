import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { IProduct } from '../../types/types';

export const ProductCard: React.FC<IProduct> = ({
    name,
    author,
    id,
    price,
    coverUrl,
}) => {
    return (
        <Link to={`/${id}`}>
            <div className={styles.container}>
                <figure className={styles.container__card}>
                    <img
                        width={461}
                        height={256}
                        src={coverUrl}
                        alt={name}
                        className={styles.container__card__image}
                    />
                    <figcaption className={styles.container__card__info}>
                        <div className={styles.container__card__info__left}>
                            <div>{name}</div>
                            <div>{author?.name}</div>
                        </div>
                        <div>{price}</div>
                    </figcaption>
                </figure>
            </div>
        </Link>
    );
};
