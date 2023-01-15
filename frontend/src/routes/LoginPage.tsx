import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ILoginData } from '../types/types';
import { fetchUser, login } from "../store/actionCreators/actionCreatorsLogin";
import Error from "../components/Error/Error";

export const LoginPage = () => {
	const {isAuth, token} = useAppSelector(state => state.authReducer);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ILoginData>();
    const onSubmit: SubmitHandler<ILoginData> = data => {
        dispatch(login(data));
        reset();
    };

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUser(token));
            navigate('/profile');
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
                        <h1 className="text-center mb-6 text-[32px]">Вход</h1>
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
                            className="w-[250px] h-[60px] rounded-[15px] text-xl text-white self-center mb-28"
                            type="submit"
                            style={{ background: '#80E0A1' }}
                        >
                            Войти
                        </button>
                        <div className="text-xl">
                            Или{' '}
                            <Link className={'text-[#0075FF]'} to="/login">
                                зарегистрируйтесь
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
