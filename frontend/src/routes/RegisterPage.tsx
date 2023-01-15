import { Fragment, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { IRegisterData } from '../types/types';
import {
    fetchUser,
    register as registerAction,
} from '../store/actionCreators/actionCreatorsLogin';
import Error from '../components/Error/Error';

export const Register = () => {
    const navigate = useNavigate();
    const { isAuth, token } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IRegisterData>();

    const onSubmit: SubmitHandler<IRegisterData> = data => {
        dispatch(registerAction(data));
        reset();
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/profile');
            dispatch(fetchUser(token));
        }
    }, [isAuth, navigate, token, dispatch]);

    return (
        <>
            {!isAuth && (
                <div className="w-[756px] h-[570px] rounded-[25px] border mx-auto pt-6 pb-12 mb-[100px] mt-10">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mx-auto w-[533px]"
                    >
                        <h1 className="text-center mb-6 text-[32px]">
                            Регистрация
                        </h1>
                        <input
                            type="text"
                            placeholder="Email"
                            className="h-[69px] outline outline-1 outline-[#D9D9D9] rounded-[71px] text-xl pl-9 mb-5"
                            {...register('email', {
                                required: 'Email обязательное поле',
                                pattern: {
                                    value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                    message: 'Введите корректный email',
                                },
                            })}
                        />
                        <Error
                            error={errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <input
                            type="text"
                            placeholder="Имя"
                            className="h-[69px] outline outline-1 outline-[#D9D9D9] rounded-[71px] text-xl pl-9 mb-5"
                            {...register('username', {
                                required: 'Username обязательное поле',
                                minLength: {
                                    value: 4,
                                    message: `Минимальная длина имени ${4} символа`,
                                },
                            })}
                        />
                        <Error
                            error={errors.username}
                            errorMessage={errors.username?.message}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="h-[69px] outline outline-1 outline-[#D9D9D9] rounded-[71px] text-xl pl-9 mb-9"
                            {...register('password', {
                                required: 'Password обязательное поле',
                                minLength: {
                                    value: 6,
                                    message: `Минимальная длина пароля ${6} символов`,
                                },
                            })}
                        />
                        <Error
                            error={errors.password}
                            errorMessage={errors.password?.message}
                        />
                        <button
                            className="w-[250px] h-[60px] rounded-[15px] text-xl text-white self-center mb-9"
                            type="submit"
                            style={{ background: '#80E0A1' }}
                        >
                            Зарегистрироваться
                        </button>
                        <div className="text-xl">
                            Или{' '}
                            <Link className={'text-[#0075FF]'} to="/login">
                                войдите
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
