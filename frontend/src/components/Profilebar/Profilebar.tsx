import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { logout } from '../../store/slices/authSlice';
import styles from './Profilebar.module.scss';

export const Profilebar: FC<{ name: string; avatar: string }> = ({
    name,
    avatar,
}) => {
    const dispatch = useAppDispatch();
    const image = useMemo(
        () => btoa(unescape(encodeURIComponent(avatar))),
        [avatar]
    );
    return (
        <div className={styles.container}>
            <div className="w-[251px] h-11 flex justify-between mr-[92px]">
                <img
                    src={process.env.PUBLIC_URL + '/profile/cart.svg'}
                    width={44}
                    alt=""
                />
                <img
                    src={process.env.PUBLIC_URL + '/profile/bell.svg'}
                    width={44}
                    alt=""
                />
                <img
                    src={process.env.PUBLIC_URL + '/profile/mail.svg'}
                    width={44}
                    alt=""
                />
            </div>
            <img
                width={50}
                height={50}
                src={`data:image/svg+xml;base64,${image}`}
                alt=""
            />
            <p className={styles.container__account}>
                <Link to={'/profile'}>{name}</Link>
            </p>
            <button className="ml-10" onClick={() => dispatch(logout())}>
                выйти
            </button>
        </div>
    );
};
