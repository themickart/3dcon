import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { IRegisterData } from '../types/types';
import { fetchUser, register as registerAction } from "../store/actionCreators/actionCreatorsLogin";
import Error from "../components/Error/Error";

export const Register = () => {
	const navigate = useNavigate();
	const {isAuth, token} = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<IRegisterData>();

	const onSubmit: SubmitHandler<IRegisterData> = data =>
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
						className="flex flex-col w-64 mx-auto my-40"
					>
						<h1 className='flex text-center mb-6 text-3xl'>Регистрация</h1>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							{...register('email',
								{
									required: "Email обязательное поле",
									pattern: {
										value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
										message: 'Введите корректный email'
									}
								})}
						/>
						<Error error={errors.email} errorMessage={errors.email?.message}/>
						<label htmlFor="username">Имя</label>
						<input
							type="text"
							id="username"
							{...register('username',
								{
									required: "Username обязательное поле",
									minLength: {
										value: 4,
										message: `Минимальная длина имени ${4} символа`
									}
								})}
						/>
						<Error error={errors.username} errorMessage={errors.username?.message}/>
						<label htmlFor="password">Пароль</label>
						<input
							type="password"
							id="password"
							{...register('password',
								{
									required: 'Password обязательное поле',
									minLength: {
										value: 6,
										message: `Минимальная длина пароля ${6} символов`
									}
								})}
						/>
						<Error error={errors.password} errorMessage={errors.password?.message}/>
						<button type="submit">Зарегистрироваться</button>
						<br/>
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
