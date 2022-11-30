import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchUser, login } from '../store/actionCreators';
import { ILoginData } from '../types/types';

export const LoginPage = () => {
    const { isAuth, token } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<ILoginData>();
    const onSubmit: SubmitHandler<ILoginData> = (data) => dispatch(login(data));

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUser(token));
            navigate('/profile');
        }
    }, [isAuth, navigate, token, dispatch]);

    return (
        <>
            {!isAuth && (
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col w-40"
                    >
                        <label htmlFor="username">Имя</label>
                        <input
                            type="text"
                            id="username"
                            {...register('username')}
                        />
                        <label htmlFor="password">пароль</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                        />
                        <button type="submit">Войти</button>
                    </form>
                    <br />
                    <div>
                        Или{' '}
                        <Link to="/register" className="text-blue-500">
                            зарегистрируйтесь
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};
