import { FC, useEffect } from 'react';
import { Logo } from '../Logo/Logo';
import { Navbar } from '../Navbar/Navbar';
import { Search } from '../Search/Search';
import { Signbar } from '../Signbar/Signbar';
import { Profilebar } from '../Profilebar/Profilebar';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchUser } from '../../store/actionCreators/actionCreatorsLogin';

export const Header: FC = () => {
    const { isAuth, token } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isAuth) dispatch(fetchUser(token));
    }, [isAuth, token, dispatch]);

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
            {isAuth ? <Profilebar /> : <Signbar />}
        </header>
    );
};
