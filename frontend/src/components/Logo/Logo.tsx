import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Logo.module.scss";

export const Logo: React.FC = () => {
  return (
    <motion.div
      className={styles.logo}
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
    >
      <Link to={"/"}>
        <span>3</span>
        <span>D</span>
        <span>con</span>
      </Link>
    </motion.div>
  );
};
