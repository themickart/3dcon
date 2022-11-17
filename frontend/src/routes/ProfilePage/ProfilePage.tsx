import { useEffect } from "react";
import styles from "./ProfilePage.module.scss";
import { fetchModels } from "../../store/actionCreators";
import { ModelCard } from "../../components/Model/ModelCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { motion } from "framer-motion";

export const ProfilePage = () => {
  const { list, error, loading } = useAppSelector(
    (state) => state.modelReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);
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
      <div className={styles.container__my}>
        <p className={styles.container__my__title}>Мои модели</p>
        <div className={styles.container__my__models}>
          {error
            ? error
            : loading
            ? "Загрузка..."
            : list?.length
            ? list?.map((model) => (
                <motion.div
                  key={model.id}
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                >
                  <ModelCard {...model} />
                </motion.div>
              ))
            : "У вас пока нет собственных продуктов"}
        </div>
      </div>
    </div>
  );
};
