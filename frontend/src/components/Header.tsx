import React from "react";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Signbar } from "./Signbar";

export const Header: React.FC = () => {
  return (
    <header
      className="topbar"
      style={{
        fontSize: "26px",
        height: 125,
        display: "flex",
        background: "#4f4f4f",
        color: "#ccc",
        alignItems: "center",
        width: "auto",
        padding: 0,
        marginBottom: 27,
      }}
    >
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
      <Signbar />
    </header>
  );
};
