import styles from "./ProfilePage.module.scss";

export const ProfilePage = () => {
  const basePath = process.env.PUBLIC_URL + "/profile/";
  return (
    <div className={styles.container}>
      <div className={styles.container__topSection}>
        <div className={styles.container__topSection__statisticsBlock}>
          <p className={styles.container__topSection__statisticsBlock__stonks}>
            Заработок
          </p>
          <p
            className={
              styles.container__topSection__statisticsBlock__statistics
            }
          >
            График или другое отображение статистики
          </p>
        </div>
        <div className={styles.container__topSection__reputationBlock}>
          <p
            className={
              styles.container__topSection__reputationBlock__reputationTitle
            }
          >
            Репутация
          </p>
          <button
            className={
              styles.container__topSection__reputationBlock__reputationStatistics
            }
          >
            <p
              className={
                styles.container__topSection__reputationBlock__reputationStatistics__percent
              }
            >
              99.98 %
            </p>
          </button>
          <div
            className={styles.container__topSection__reputationBlock__reviews}
          >
            <p
              className={
                styles.container__topSection__reputationBlock__reviews__all
              }
            >
              Отзывы за все время: 451
            </p>
            <p
              className={
                styles.container__topSection__reputationBlock__reviews__month
              }
            >
              Отзывы за этот месяц: 153
            </p>
            <p
              className={
                styles.container__topSection__reputationBlock__reviews__week
              }
            >
              Отзывы за эту неделю: 23
            </p>
          </div>
        </div>
      </div>
      <div className={styles.container__myBlock}>
        <p className={styles.container__myBlock__myTitle}>Мои модели</p>
        <div className={styles.container__myBlock__my}>
          <img
            className={styles.container__myBlock__my__img}
            src={basePath + "example_model.png"}
            alt=""
          />
          <div className={styles.container__myBlock__my__productInfo}>
            <p>Название</p>
            <p>Категория</p>
            <p>Цена</p>
          </div>
          <p className={styles.container__myBlock__my__sales}>Продажи</p>
          <p className={styles.container__myBlock__my__views}>Просмотры</p>
          <div className={styles.container__myBlock__my__functions}>
            <button>
              <img src={basePath + "edit.svg"} alt="" />
            </button>
            <button>
              <img src={basePath + "hide.svg"} alt="" />
            </button>
            <button>
              <img src={basePath + "delete.svg"} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
