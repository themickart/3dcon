import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Navbar.module.scss';

export const Navbar: React.FC<{
    menuItems: { title: string; path: string }[];
}> = ({ menuItems }) => {
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
        </nav>
    );
};
