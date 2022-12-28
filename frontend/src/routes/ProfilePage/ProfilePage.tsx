import { useEffect } from 'react';
import styles from './ProfilePage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOtherUser } from '../../store/actionCreators/actionCreatorsUsers';
import { fetchProducts } from '../../store/actionCreators/actionCreatorsProduct';
import { CardsList } from '../../components/CardsList/CardsList';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>();
    const { reputation, avatarUrl } = useAppSelector(
        state => state.userReducer
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchOtherUser(username!));
        dispatch(fetchProducts(username));
    }, [dispatch, navigate, username]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container__topSection}>
                    <div className="flex flex-col justify-between mr-5">
                        <div className="w-[727px] h-[300px] flex">
                            <div>
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        (avatarUrl || '/avatars/empty.svg')
                                    }
                                    width={300}
                                    alt=""
                                />
                            </div>
                            <div className="flex items-center pl-[59px]">
                                <p className="text-5xl">{username}</p>
                            </div>
                        </div>
                        <div className="w-[950px] h-[157px] border rounded-[15px] flex">
                            <div className="w-[383px] h-[71px]">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/icons/profile/star.svg'
                                    }
                                    alt=""
                                />
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/icons/profile/star.svg'
                                    }
                                    alt=""
                                />{' '}
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/icons/profile/star.svg'
                                    }
                                    alt=""
                                />{' '}
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/icons/profile/star.svg'
                                    }
                                    alt=""
                                />{' '}
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/icons/profile/star.svg'
                                    }
                                    alt=""
                                />
                            </div>
                            <button></button>
                        </div>
                    </div>
                    <div className="w-[560px] h-[505px] border rounded-[15px] pt-[18px] flex flex-col items-center">
                        <p className="text-[32px] font-bold text-[#959595] text-center">
                            Репутация
                        </p>
                        <button
                            style={{
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            }}
                            className="w-[415px] h-[55px] bg-[#80E0A1] rounded-[35px] mt-[30px] mb-[124px]"
                        >
                            <p className="font-normal text-xl text-[#ffffff]">
                                {reputation!.total} %
                            </p>
                        </button>
                        <div className="w-[415px] h-[174px] flex flex-col justify-between ">
                            <div className="flex justify-between text-2xl">
                                <p>Отзывы за все время:</p>
                                <p>{reputation!.reviews}</p>
                            </div>
                            <div className="flex justify-between text-2xl">
                                <p>Отзывы за этот месяц:</p>
                                <p>{reputation!.reviewsThisMonth}</p>
                            </div>
                            <div className="flex justify-between text-2xl">
                                <p>Отзывы за эту неделю:</p>
                                <p>{reputation!.reviewsThisWeek}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container__my}>
                    <p className={styles.container__my__title}>Мои модели</p>
                    <CardsList />
                </div>
            </div>
        </>
    );
};
