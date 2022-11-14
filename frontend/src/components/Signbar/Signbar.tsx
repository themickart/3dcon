import React from "react";
import { Link } from "react-router-dom";
import styles from "./Signbar.module.scss";

export const Signbar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>Регистрация</div>
      <Link to={"/profile"}>Вход</Link>
    </div>
  );
};
