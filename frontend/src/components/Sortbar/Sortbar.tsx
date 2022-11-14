import React from "react";
import styles from "./Sortbar.module.scss";

export const Sortbar: React.FC<{ params: string[] }> = ({ params }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__options}>
        {params.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      <div>Сортировка</div>
    </div>
  );
};
