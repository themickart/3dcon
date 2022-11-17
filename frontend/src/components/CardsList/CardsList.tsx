import React, { useEffect } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { motion } from "framer-motion";
import styles from "./CardsList.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchProducts } from "../../store/actionCreators";

export const CardsList: React.FC = () => {
  const { list, error, loading } = useAppSelector(
    (state) => state.productReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      {error
        ? error
        : loading
        ? "Загрузка..."
        : list?.length &&
          list.map(({ id, ...product }) => (
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
