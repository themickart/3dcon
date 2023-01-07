import { Modal } from 'antd';
import { FC, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { editAvatar } from '../../store/actionCreators/actionCreatorsLogin';
import { logout } from '../../store/slices/authSlice';
import styles from './Profilebar.module.scss';

interface IEditAvatarData {
    file: File;
}

export const Profilebar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { token, username } = useAppSelector(state => state.authReducer);
    const { avatarUrl } = useAppSelector(state => state.userReducer);
    const ref = useRef<HTMLInputElement>(null);
    const { handleSubmit, setValue, reset } = useForm<IEditAvatarData>();
    interface Event<T = EventTarget> {
        target: T;
    }
    const handleChange = (e: Event<HTMLInputElement>) =>
        setValue('file', e.target.files?.[0]!);
    const onSubmit: SubmitHandler<IEditAvatarData> = ({ file }) => {
        dispatch(editAvatar(token, file));
        reset();
        setIsOpen(false);
    };
    return (
        <>
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
                    className="rounded-[50%] max-h-[50px] max-w-[50px]"
                    src={avatarUrl}
                    alt=""
                    onClick={() => setIsOpen(true)}
                />
                <p className={styles.container__account}>
                    <Link to={'/profile'}>{username}</Link>
                </p>
                <button className="ml-10" onClick={() => dispatch(logout())}>
                    выйти
                </button>
            </div>
            <Modal
                open={isOpen}
                footer={null}
                onCancel={() => setIsOpen(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div onClick={() => ref.current?.click()}>
                        Прикрепить аватарку
                    </div>
                    <input
                        type="file"
                        ref={ref}
                        className="w-0 h-0 m-0 p-0 opacity-0 overflow-hidden"
                        accept="image/*,.png,.jpg,.gif,.web"
                        onChange={handleChange}
                    />
                    <button type="submit">Изменить</button>
                </form>
            </Modal>
        </>
    );
};
