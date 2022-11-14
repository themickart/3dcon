import React from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};
