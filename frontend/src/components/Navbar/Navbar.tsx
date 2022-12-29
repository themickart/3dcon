import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Navbar.module.scss';
import { useAppSelector } from '../../hooks/reduxHooks';
import ModelAddContext from '../ModelAdd/ModelAddContext';

export const Navbar: React.FC<{
    menuItems: { title: string; path: string }[];
}> = ({ menuItems }) => {
    const { isAuth } = useAppSelector(state => state.authReducer);
    const setIsShow = useContext(ModelAddContext)[1];
    return (
        <nav className={styles.menu}>
            {menuItems.map(({ title, path }) => (
                <motion.div
                    key={title}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{
                        backgroundColor: '#ccc',
                        borderRadius: '25%',
                        scale: 1.2,
                    }}
                >
                    <Link to={path}>{title}</Link>
                </motion.div>
            ))}
            {isAuth ? (
                <button
                    className="text-[22.5px] bg-[#80e0a1] text-[#ffffff] w-[270px] h-[50px] rounded-[10px]"
                    onClick={() => setIsShow(true)}
                >
                    Опубликовать проект
                </button>
            ) : (
                <div className="w-[270px]"></div>
            )}
        </nav>
    );
};
