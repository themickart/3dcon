import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import ModelAddItem from '../ModelAdd/ModelAddItem';

export const Layout: React.FC = () => {
    return (
        <div>
            <ModelAddItem />
            <main className={styles.container}>
                <Outlet />
            </main>
        </div>
    );
};
