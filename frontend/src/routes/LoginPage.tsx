import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ILoginData } from '../types/types';
import { fetchUser, login } from "../store/actionCreators/actionCreatorsLogin";
import { Alert, Space } from "antd";

export const LoginPage = () => {
	const {isAuth, token} = useAppSelector(state => state.authReducer);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<ILoginData>();
	const onSubmit: SubmitHandler<ILoginData> = data => dispatch(login(data));

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
						className="flex flex-col w-64 mx-auto my-40"
					>
						<h1 className='flex text-center mb-6 text-3xl'>Авторизация</h1>
						<label htmlFor="username">Имя</label>
						<input
							type="text"
							id="username"
							{...register('username',
								{
									required: "Username обязательное поле"
								})}
						/>
						{errors.username && (<Space className='text-red-500'>
							<Alert message={errors.username.message} type='error'/>
						</Space>)}
						<label htmlFor="password">Пароль</label>
						<input
							type="password"
							id="password"
							{...register('password',
								{
									required: 'Password обязательное поле',
								})}
						/>
						{errors.password && (<Space className='text-red-500'>
							<Alert message={errors.password.message} type='error'/>
						</Space>)}
						<button type="submit">Войти</button>
						<br/>
						<div>
							Или{' '}
							<Link to="/register" className="text-blue-500">
								зарегистрируйтесь
							</Link>
						</div>
					</form>
				</div>
			)}
		</>
	);
};
