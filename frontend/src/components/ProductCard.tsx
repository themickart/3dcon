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
    <Link to={`/${id}`} className="text-black text-2xl">
      <div className="max-w-[461px] max-h-[339px]">
        <figure className="flex flex-col m-auto">
          <img
            width={461}
            height={256}
            src={process.env.PUBLIC_URL + imgUrl}
            alt={title}
            className="max-w-[461px] max-h-[256px]"
          />
          <figcaption className="flex items-center justify-between bg-[#d9d9d9] pl-[11px] pr-[37px] pb-2 pt-[9px] h-[83px]">
            <div className="flex flex-col justify-between">
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
