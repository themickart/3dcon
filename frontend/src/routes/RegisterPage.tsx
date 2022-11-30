import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchUser, register as registerAction } from '../store/actionCreators';
import { IRegisterData } from '../types/types';

export const Register = () => {
    const navigate = useNavigate();
    const { isAuth, token } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<IRegisterData>();
    const onSubmit: SubmitHandler<IRegisterData> = (data) =>
        dispatch(registerAction(data));
    useEffect(() => {
        if (isAuth) {
            navigate('/profile');
            dispatch(fetchUser(token));
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
                        <label htmlFor="email">email</label>
                        <input type="text" id="email" {...register('email')} />
                        <label htmlFor="username">имя</label>
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
                        <button type="submit">Зарегистрироваться</button>
                        <br />
                        <div>
                            Или{' '}
                            <Link to="/login" className="text-blue-500">
                                войдите
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
