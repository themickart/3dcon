import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Signbar.module.scss';

export const Signbar: React.FC = () => {
    return (
        <div className={styles.container}>
            <Link to={'/register'}>Регистрация</Link>
            <Link to={'/login'}>Вход</Link>
        </div>
    );
};
