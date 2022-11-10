import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, ProductCard } from "../components/ProductCard";
import { SliderGroup } from "../components/SliderGroup";
import { motion } from "framer-motion";

export const ProjectPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [
    {
      author,
      description,
      info,
      license,
      likesCount,
      price,
      tags,
      title,
      viewsCount,
      gallery,
    },
    setProduct,
  ] = useState<Product>({} as Product);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      setProduct(
        await (
          await fetch(`http://localhost:3001/products/${productId}`)
        ).json()
      );
      setProducts(
        await (
          await fetch(`http://localhost:3001/products?id_ne=${productId}`)
        ).json()
      );
    })();
  }, [productId]);
  return (
    <div className="w-[1450px] m-auto">
      <h1 className="text-5xl font-normal ml-11 text-[#80e0a1] mb-6">
        {title}
      </h1>
      <div className="flex justify-between">
        <SliderGroup gallery={gallery} />
        <div>
          <div className="buy-info max-w-[466px] h-[350px] border border-solid border-#dddddd rounded-[15px]">
            <p className="text-center text-[64px] mt-[40px]">{price}</p>
            <p className="text-center mt-[29px] text-2xl">{license}</p>
            <button className="w-[230px] h-[75px] mt-10 mb-[45px] mx-[118px] text-2xl rounded-[37.5px] px-2 bg-[#80e0a1]">
              <p className="h-[70px]">добавить в корзину</p>
            </button>
          </div>
          <div className="author-tags max-w-[466px] max-h[350px] border border-solid border-[#dddddd] rounded-[15px] mt-[29px] p-[34px_25px_105px_26px]">
            <div className="author flex m-0">
              <div className="mr-[23px]">
                <img src={process.env.PUBLIC_URL + author?.avatar} alt="ава" />
              </div>
              <div className="h-[100px]">
                <p className="text-[32px] m-0">{author?.name}</p>
                <p className="text-2xl mt-[11px]">{author?.salesCount}</p>
              </div>
            </div>
            <hr className="mt-[41px]" />
            <div>
              {tags?.map((tag) => (
                <div
                  className="inline-block px-[3px] pt-[3px] pb-2 rounded-lg bg-[#d9d9d9] text-2xl mt-6 mr-3"
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-[127px] justify-between">
        <div className="w-[950px]">
          <div className="flex mb-[61px] items-center">
            <button className="w-[466px] h-[75px] text-2xl border rounded-[15px] bg-[#fbfbfb] mr-[99px]">
              + Добавить в список желаемого
            </button>
            <div className="statistics text-2xl w-[284px] h-9 flex justify-between text-[#80e0a1]">
              <img src={process.env.PUBLIC_URL + "/icons/views.svg"} alt="" />
              <div>{viewsCount}</div>
              <img src={process.env.PUBLIC_URL + "/icons/likes.svg"} alt="" />
              <div>{likesCount}</div>
              <img src={process.env.PUBLIC_URL + "/icons/flag.svg"} alt="" />
            </div>
          </div>
          <div className="py-[18px] px-[31px] rounded-[15px] border border-solid border-[#dddddd]">
            <h1 className="mb-[21px] text-[40px] h-12 font-bold">Описание</h1>
            <p className="text-2xl">{description}</p>
          </div>
        </div>
        <div className="max-w-[466px] border border-solid border-[#dddddd] rounded-[15px] py-[23px] pr-[18px] pl-[29px]">
          <h2 className="m-0 text-[32px] font-bold">Информация о 3д модели</h2>
          {info?.map((i) => (
            <p className="text-[32px]" key={i}>
              {i}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-[121px]">
        <h1 className="text-[40px] font-bold mb-8">Похожие товары</h1>
        <div className="flex justify-between">
          {[...products.slice(0, 2), products?.at(-1)].map((p) => (
            <motion.div
              key={p?.id}
              whileHover={{
                scale: 1.05,
                border: "3px solid transparent",
                zIndex: 10,
              }}
              whileTap={{ scale: 0.95 }}
              className="mb-5"
            >
              <ProductCard {...p!} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
