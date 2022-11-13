import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

export interface Author {
  name: string;
  avatar: string;
  salesCount: number;
}

export interface Product {
  id: number;
  title: string;
  imgUrl: string;
  gallery: string[];
  price: number;
  author: Author;
  description: string;
  likesCount: number;
  viewsCount: number;
  tags: string[];
  info: string[];
  license: string;
}

export const ProductCard: React.FC<Product> = ({
  title,
  author,
  id,
  price,
  imgUrl,
}) => {
  return (
    <Link to={`/${id}`}>
      <div className={styles.container}>
        <figure className={styles.container__card}>
          <img
            width={461}
            height={256}
            src={process.env.PUBLIC_URL + imgUrl}
            alt={title}
            className={styles.container__card__image}
          />
          <figcaption className={styles.container__card__info}>
            <div className={styles.container__card__info__left}>
              <div>{title}</div>
              <div>{author?.name}</div>
            </div>
            <div>{price}</div>
          </figcaption>
        </figure>
      </div>
    </Link>
  );
};
