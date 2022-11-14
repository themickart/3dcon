import React from "react";
import { Logo } from "../Logo/Logo";
import { Navbar } from "../Navbar/Navbar";
import { Search } from "../Search/Search";
import { Signbar } from "../Signbar/Signbar";
import { Profilebar } from "../Profilebar/Profilebar";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <header className={styles.topbar}>
      <Logo />
      <Navbar
        menuItems={[
          {
            title: "Лучшие",
            path: "/bests",
          },
          {
            title: "Проекты",
            path: "/",
          },
          {
            title: "Изображения",
            path: "/pictures",
          },
        ]}
      />
      <Search />
      {pathname === "/profile" || pathname === "/profile/" ? (
        <Profilebar />
      ) : (
        <Signbar />
      )}
    </header>
  );
};
