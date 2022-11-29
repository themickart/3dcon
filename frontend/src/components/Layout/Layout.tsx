import React from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import ModalItem from "../ModalItem";

export const Layout: React.FC = () => {
  return (
    <div>
      <ModalItem></ModalItem>
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};
