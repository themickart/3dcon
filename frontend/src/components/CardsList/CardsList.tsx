import React, { useEffect, useState } from "react";
import { Product } from "../ProductCard/ProductCard";
import { ProductCard } from "../ProductCard/ProductCard";
import { motion } from "framer-motion";
import styles from "./CardsList.module.scss";

export const CardsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () =>
      setProducts(
        await (await fetch("http://localhost:3001/products")).json()
      ))();
  }, []);
  return (
    <div className={styles.wrapper}>
      {products.map(({ id, ...product }) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.05, marginBottom: 0 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: "0" }}
          animate={{ y: 20 }}
        >
          <ProductCard id={id} {...product} />
        </motion.div>
      ))}
    </div>
  );
};
