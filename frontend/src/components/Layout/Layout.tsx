import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import ModelAddItem from '../ModelAdd/ModelAddItem';
import { Footer } from '../Footer/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../store/slices/authSlice';

export const Layout: FC = () => {
    const { token } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!token) dispatch(logout());
    }, [token, dispatch]);
    return (
        <div className="flex flex-col min-h-screen">
            <ModelAddItem />
            <main className={styles.container}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
