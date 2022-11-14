import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, ProductCard } from "../../components/ProductCard/ProductCard";
import { SliderGroup } from "../../components/SliderGroup/SliderGroup";
import { motion } from "framer-motion";
import styles from "./ProjectPage.module.scss";

function getRandomProducts(products: Product[]): Product[] {
  const res = [] as Product[];
  while (res.length < 3) {
    const randProduct = products[Math.trunc(Math.random() * products.length)];
    if (res.length && res?.some(({ id }) => id === randProduct?.id)) continue;
    res.push(randProduct);
  }
  return res;
}

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
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      setProduct(
        await (
          await fetch(`http://localhost:3001/products/${productId}`)
        ).json()
      );
      setRandomProducts(
        getRandomProducts(
          await (
            await fetch(`http://localhost:3001/products?id_ne=${productId}`)
          ).json()
        )
      );
    })();
  }, [productId]);
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.topSection}>
        <SliderGroup gallery={gallery} />
        <div>
          <div className={styles.topSection__buyInfo}>
            <p className={styles.topSection__buyInfo__price}>{price}</p>
            <p className={styles.topSection__buyInfo__license}>{license}</p>
            <button className={styles.topSection__buyInfo__button}>
              <p className={styles.topSection__buyInfo__button_incart}>
                добавить в корзину
              </p>
            </button>
          </div>
          <div className={styles.topSection__authorTags}>
            <div className={styles.topSection__authorTags__author}>
              <div className={styles.topSection__authorTags__author__avatar}>
                <img src={process.env.PUBLIC_URL + author?.avatar} alt="ава" />
              </div>
              <div className={styles.topSection__authorTags__author__info}>
                <p className={styles.topSection__authorTags__author__name}>
                  {author?.name}
                </p>
                <p className={styles.topSection__authorTags__author__sales}>
                  {author?.salesCount}
                </p>
              </div>
            </div>
            <hr className={styles.topSection__authorTags__tags} />
            <div>
              {tags?.map((tag) => (
                <div
                  className={styles.topSection__authorTags__tags__tag}
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.bottomSection__left}>
          <div className={styles.bottomSection__left__saveStatistics}>
            <button
              className={styles.bottomSection__left__saveStatistics__save}
            >
              + Добавить в список желаемого
            </button>
            <div
              className={styles.bottomSection__left__saveStatistics__statistics}
            >
              <img src={process.env.PUBLIC_URL + "/icons/views.svg"} alt="" />
              <div>{viewsCount}</div>
              <img src={process.env.PUBLIC_URL + "/icons/likes.svg"} alt="" />
              <div>{likesCount}</div>
              <img src={process.env.PUBLIC_URL + "/icons/flag.svg"} alt="" />
            </div>
          </div>
          <div className={styles.bottomSection__left__description}>
            <h1 className={styles.bottomSection__left__description__header}>
              Описание
            </h1>
            <p className={styles.bottomSection__left__description__text}>
              {description}
            </p>
          </div>
        </div>
        <div className={styles.bottomSection__infoBlock}>
          <h2 className={styles.bottomSection__infoBlock__infoTitle}>
            Информация о 3д модели
          </h2>
          {info?.map((i) => (
            <p className={styles.bottomSection__infoBlock__content} key={i}>
              {i}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.similars}>
        <h1 className={styles.similars__title}>Похожие товары</h1>
        <div className={styles.similars__products}>
          {randomProducts.map((p) => (
            <motion.div
              key={p?.id}
              whileHover={{
                scale: 1.05,
                margin: 0,
              }}
              whileTap={{ scale: 0.95 }}
              className={styles.similars__products__product}
            >
              <ProductCard {...p!} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
