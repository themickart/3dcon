import React from "react";
import { Logo } from "../Logo/Logo";
import { Navbar } from "../Navbar/Navbar";
import { Search } from "../Search/Search";
import { Signbar } from "../Signbar/Signbar";
import { Profilebar } from "../Profilebar/Profilebar";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addModel } from "../../store/actionCreators";

export const Header: React.FC = () => {
  const hardcoredModels = [
    {
      id: "0",
      title: "Название",
      category: "Категория",
      price: "Цена",
      imgUrl: "/products/card0/gallery/card0_1.png",
      sales: "10",
      views: "100",
    },
    {
      id: "1",
      title: "Название",
      category: "Категория",
      price: "Цена",
      imgUrl: "/products/card1/gallery/card1_1.png",
      sales: "10",
      views: "100",
    },
    {
      id: "2",
      title: "Название",
      category: "Категория",
      price: "Цена",
      imgUrl: "/products/card2/gallery/card2_1.png",
      sales: "10",
      views: "100",
    },
    {
      id: "3",
      title: "Название",
      category: "Категория",
      price: "Цена",
      imgUrl: "/products/card3/gallery/card3_1.png",
      sales: "10",
      views: "100",
    },
    {
      id: "4",
      title: "Название",
      category: "Категория",
      price: "Цена",
      imgUrl: "/products/card4/gallery/card4_1.png",
      sales: "10",
      views: "100",
    },
    {
      id: "5",
      title: "Название",
      category: "Категория",
      price: "Цена",
      imgUrl: "/products/card5/gallery/card5_1.png",
      sales: "10",
      views: "100",
    },
  ];
  const { pathname } = useLocation();
  const { list } = useAppSelector(({ modelReducer }) => modelReducer);
  const dispatch = useAppDispatch();
  function addModels() {
    let index = 0;
    const otherModels = hardcoredModels.filter(
      ({ id }) => !list.some((model) => model.id === id)
    );
    const interval = setInterval(() => {
      if (index === otherModels.length) return () => clearInterval(interval);
      dispatch(addModel(otherModels[index++]));
    }, 500);
  }
  return (
    <header className={styles.topbar}>
      <Logo />
      <Navbar
        menuItems={[
          {
            title: "Популярное",
            path: "/populars",
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
      {(pathname === "/profile" || pathname === "/profile/") && (
        <button
          className="text-[22.5px] bg-[#80e0a1] text-[#4f4f4f] w-[200px] h-[45px] rounded-[20px] ml-[53px]"
          onClick={addModels}
        >
          Загрузить
        </button>
      )}
      <Search />
      {pathname === "/profile" || pathname === "/profile/" ? (
        <Profilebar />
      ) : (
        <Signbar />
      )}
    </header>
  );
};
