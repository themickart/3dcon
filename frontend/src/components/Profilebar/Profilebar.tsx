import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../store/slices/authSlice";
import styles from "./Profilebar.module.scss";

export const Profilebar: FC<{ name: string; avatar: string }> = ({
  name,
  avatar,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <img
        width={50}
        height={50}
        src={`data:image/svg+xml;utf8,${avatar}`}
        alt=""
      />
      <p className={styles.container__account}>
        <Link to={"/profile"}>{name}</Link>
      </p>
      <button className="ml-10" onClick={() => dispatch(logout())}>
        выйти
      </button>
    </div>
  );
};
