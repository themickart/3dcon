import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Search.module.scss";

export const Search: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={styles.container}>
      <motion.form className={styles.container__form} whileTap={{ scale: 0.9 }}>
        <input
          onFocus={() => setIsVisible(true)}
          onBlur={() => setIsVisible(false)}
          type="text"
          placeholder="Поиск"
          className={styles.container__form__input}
        />
        <div className="flex-[0_0_31px]">
          {isVisible && (
            <img src={process.env.PUBLIC_URL + "/header/search.svg"} alt="" />
          )}
        </div>
      </motion.form>
    </div>
  );
};
