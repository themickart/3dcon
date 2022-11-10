import React, { useEffect, useState } from "react";
import { Product } from "./ProductCard";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

export const CardsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () =>
      setProducts(
        await (await fetch("http://localhost:3001/products")).json()
      ))();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-y-[61px] w-[1436px] mt-[47px]">
      {products.map(({ id, ...product }) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.05, border: "3px solid transparent" }}
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
