import { FC, useContext, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Navbar } from "../Navbar/Navbar";
import { Search } from "../Search/Search";
import { Signbar } from "../Signbar/Signbar";
import { Profilebar } from "../Profilebar/Profilebar";
import styles from "./Header.module.scss";
import { useAppSelector } from "../../hooks/reduxHooks";
import context from '../../Context/ModalContext';
import axios from "axios";
import { motion } from "framer-motion";

export const Header: FC = () => {
<<<<<<< HEAD
  const { isAuth, username } = useAppSelector((state) => state.authReducer);
  const { avatarArl } = useAppSelector((state) => state.userReducer);
  const [avatar, setAvatar] = useState<string>("");
  const [isShow, setIsShow] = useContext(context);
=======
	const {isAuth, username} = useAppSelector((state) => state.authReducer);
	const {avatarArl} = useAppSelector((state) => state.userReducer);
	const [avatar, setAvatar] = useState<string>();
	const [isShow, setIsShow] = useContext(context);
>>>>>>> 72bfdb6be1942a78c8d751e84536f46f00984073

	useEffect(() => {
		(async () => setAvatar((await axios.get<string>(avatarArl)).data))();
	}, [avatarArl]);

<<<<<<< HEAD
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
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ backgroundColor: "#83a8b5" }}
          className="text-[22.5px] bg-[#80e0a1] text-[#4f4f4f] w-[200px] h-[45px] rounded-[20px] ml-[53px]"
          onClick={() => setIsShow(true)}
        >
          Загрузить
        </motion.button>
      )}
      <Search />
      {isAuth ? <Profilebar name={username} avatar={avatar!} /> : <Signbar />}
    </header>
  );
};
=======
	return (
		<header className={styles.topbar}>
			<Logo/>
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
				<Button
					className="text-[22.5px] bg-[#80e0a1] text-[#4f4f4f] w-[200px] h-[45px] rounded-[20px] ml-[53px]"
					onClick={() => setIsShow(true)}
				>
					Загрузить
				</Button>
			)}
			<Search/>
			{isAuth ? <Profilebar name={username} avatar={avatar!}/> : <Signbar/>}
		</header>
	);
};
>>>>>>> 72bfdb6be1942a78c8d751e84536f46f00984073
