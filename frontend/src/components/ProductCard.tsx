import React from "react";
import { Link } from "react-router-dom";

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
    <Link
      to={`/${id}`}
      style={{
        textDecoration: "none",
        color: "black",
        fontSize: 24,
      }}
    >
      <div
        style={{
          width: 461,
          height: 339,
        }}
      >
        <figure
          style={{
            display: "flex",
            flexFlow: "column",
            margin: "auto",
          }}
        >
          <img
            width={461}
            height={256}
            src={process.env.PUBLIC_URL + imgUrl}
            alt={title}
          />
          <figcaption
            style={{
              display: "flex",
              alignItems: "center",
              height: 83,
              justifyContent: "space-between",
              backgroundColor: "#D9D9D9",
              paddingLeft: 11,
              paddingRight: 37,
            }}
          >
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-between",
              }}
            >
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
