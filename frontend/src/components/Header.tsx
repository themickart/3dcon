import React from "react";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Signbar } from "./Signbar";

export const Header: React.FC = () => {
  return (
    <header className="topbar text-[26px] h-[125px] flex bg-[#4f4f4f] text-[#ccc] items-center w-auto p-0 mb-[27px]">
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
