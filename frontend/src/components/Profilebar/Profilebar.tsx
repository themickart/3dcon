import styles from "./Profilebar.module.scss";

export const Profilebar = () => {
  const profilePath = process.env.PUBLIC_URL + "/profile/";
  return (
    <div className={styles.container}>
      <div className={styles.container__icons}>
        <img src={profilePath + "cart.svg"} alt="" />
        <img src={profilePath + "bell.svg"} alt="" />
        <img src={profilePath + "mail.svg"} alt="" />
      </div>
      <img src={process.env.PUBLIC_URL + "/avatars/empty.svg"} alt="" />
    </div>
  );
};
