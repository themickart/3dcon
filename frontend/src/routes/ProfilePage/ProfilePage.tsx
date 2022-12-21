import { useEffect } from 'react';
import styles from './ProfilePage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ModelItem } from '../../components/Model/ModelItem';
import { fetchUser } from '../../store/actionCreators/actionCreatorsLogin';
import { fetchModels } from '../../store/actionCreators/actionCreatorsProduct';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { isAuth, token } = useAppSelector(state => state.authReducer);
    const { reputation } = useAppSelector(state => state.userReducer);
    const { list, error, loading } = useAppSelector(
        state => state.modelReducer
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUser(token));
            dispatch(fetchModels(token));
        } else navigate('/login');
    }, [dispatch, isAuth, token, navigate]);

    return (
        <>
            {isAuth && (
                <div className={styles.container}>
                    <div className={styles.container__topSection}>
                        <div
                            className={
                                styles.container__topSection__statisticsBlock
                            }
                        >
                            <p
                                className={
                                    styles.container__topSection__statisticsBlock__stonks
                                }
                            >
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
                        <div
                            className={
                                styles.container__topSection__reputationBlock
                            }
                        >
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
                                    {reputation!.total} %
                                </p>
                            </button>
                            <div
                                className={
                                    styles.container__topSection__reputationBlock__reviews
                                }
                            >
                                <p
                                    className={
                                        styles.container__topSection__reputationBlock__reviews__all
                                    }
                                >
                                    Отзывы за все время: {reputation!.reviews}
                                </p>
                                <p
                                    className={
                                        styles.container__topSection__reputationBlock__reviews__month
                                    }
                                >
                                    Отзывы за этот месяц:{' '}
                                    {reputation!.reviewsThisMonth}
                                </p>
                                <p
                                    className={
                                        styles.container__topSection__reputationBlock__reviews__week
                                    }
                                >
                                    Отзывы за эту неделю:{' '}
                                    {reputation!.reviewsThisWeek}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container__my}>
                        <p className={styles.container__my__title}>
                            Мои модели
                        </p>
                        <div className={styles.container__my__models}>
                            {error
                                ? error
                                : loading
                                ? 'Загрузка...'
                                : list?.length
                                ? list?.map(model => (
                                      <motion.div
                                          key={model.id}
                                          initial={{ scale: 0.9 }}
                                          whileInView={{ scale: 1 }}
                                      >
                                          <ModelItem {...model} />
                                      </motion.div>
                                  ))
                                : 'У вас пока нет собственных продуктов'}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
