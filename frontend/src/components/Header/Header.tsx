import { FC, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Navbar } from "../Navbar/Navbar";
import { Search } from "../Search/Search";
import { Signbar } from "../Signbar/Signbar";
import { Profilebar } from "../Profilebar/Profilebar";
import styles from "./Header.module.scss";
import { useAppSelector } from "../../hooks/reduxHooks";
import axios from "axios";

export const Header: FC = () => {
  const { isAuth, username } = useAppSelector((state) => state.authReducer);
  const { avatarArl } = useAppSelector((state) => state.userReducer);
  const [avatar, setAvatar] = useState<string>();
  useEffect(() => {
    (async () => setAvatar((await axios.get<string>(avatarArl)).data))();
  }, [avatarArl]);
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
      {isAuth && (
        <button className="text-[22.5px] bg-[#80e0a1] text-[#4f4f4f] w-[200px] h-[45px] rounded-[20px] ml-[53px]">
          Загрузить
        </button>
      )}
      <Search />
      {isAuth ? <Profilebar name={username} avatar={avatar!} /> : <Signbar />}
    </header>
  );
};
