import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { IProduct } from '../../types/types';

export const ProductCard: React.FC<IProduct> = ({
    name,
    author,
    id,
    price,
    description,
    coverUrl,
}) => {
    return (
        <Link to={`/products/${id}`}>
            <div className={styles.container}>
                <figure className={styles.container__card}>
                    <img
                        width={466}
                        height={250}
                        src={coverUrl}
                        alt={name}
                        className={styles.container__card__image}
                    />
                    <figcaption className="max-h-[150px] bg-[#d9d9d9] pt-[11px] pb-[14px] px-[19px]">
                        <div className="flex justify-between">
                            <div className={styles.container__card__info__left}>
                                <div className="text-[35px]">{name}</div>
                                <div className="text-xl">{author?.name}</div>
                            </div>
                            <div className="text-2xl">{price}</div>
                        </div>
                        <div className="text-xl">{description}</div>
                    </figcaption>
                </figure>
            </div>
        </Link>
    );
};
