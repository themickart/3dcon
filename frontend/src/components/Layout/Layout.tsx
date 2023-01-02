import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import ModelAddItem from '../ModelAdd/ModelAddItem';
import { Footer } from '../Footer/Footer';

export const Layout: FC = () => {
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
