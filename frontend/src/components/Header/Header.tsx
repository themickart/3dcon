import { FC, useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Navbar } from '../Navbar/Navbar';
import { Search } from '../Search/Search';
import { Signbar } from '../Signbar/Signbar';
import { Profilebar } from '../Profilebar/Profilebar';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import axios from 'axios';
import { fetchUser } from '../../store/actionCreators/actionCreatorsLogin';

export const Header: FC = () => {
    const { isAuth, username, token } = useAppSelector(
        state => state.authReducer
    );
    const { avatarUrl } = useAppSelector(state => state.userReducer);
    const [avatar, setAvatar] = useState<string>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUser(token));
            (async () =>
                setAvatar((await axios.get<string>(avatarUrl)).data))();
        }
    }, [avatarUrl, isAuth, token, dispatch]);

    return (
        <header className={styles.topbar}>
            <Logo />
            <Navbar
                menuItems={[
                    {
                        title: 'Лучшие',
                        path: '/bests',
                    },
                    {
                        title: 'Проекты',
                        path: '/products',
                    },
                ]}
            />
            <Search />
            {isAuth ? (
                <Profilebar name={username} avatar={avatar!} />
            ) : (
                <Signbar />
            )}
        </header>
    );
};
