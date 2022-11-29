import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

export interface IInfo {
  [key: string]: string;
}

export interface IReputations {
  reviews: number;
  reviewsThisMonth: number;
  reviewsThisWeek: number;
  total: number;
}

export interface IAuthor {
  name: string;
  avatarUrl: string;
  salesCount: number;
  reputations: IReputations;
}

export interface IProduct {
  id?: number;
  category?: string;
  name?: string;
  coverUrl?: string;
  gallery?: string[];
  price?: number;
  author?: IAuthor;
  description?: string;
  likesCount?: number;
  viewsCount?: number;
  tags?: string[];
  info?: IInfo;
  license?: string;
  createdAt?: string;
  isLiked?: boolean;
  isViewed: boolean;
}

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
            src={process.env.PUBLIC_URL + coverUrl}
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
