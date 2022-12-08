import { AppDispatch } from "..";
import axios from "../../axios";
import { ILoginData, IRegisterData } from "../../types/types";
import { loginSuccess } from "../slices/authSlice";
import { userFetchingSuccess } from "../slices/userSlice";

import {
	IUserState as IUserResponse,
} from '../slices/userSlice';

export const register =
	(data: IRegisterData) => async (dispatch: AppDispatch) => {
		try {
			const token = (await axios.post<string>('auth/join', data)).data;
			dispatch(loginSuccess({ token, username: data.username }));
		} catch (e) {
			console.log((e as Error).message);
		}
	};

export const login = (data: ILoginData) => async (dispatch: AppDispatch) => {
	try {
		const token = (await axios.post<string>('auth/login', data)).data;
		dispatch(loginSuccess({ token, username: data.username }));
	} catch (e) {
		console.log((e as Error).message);
	}
};

export const fetchUser = (token: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(
			userFetchingSuccess(
				(
					await axios.get<IUserResponse>('account/me', {
						headers: { Authorization: `Bearer ${token}` },
					})
				).data
			)
		);
	} catch (e) {
		console.error((e as Error).message);
	}
};
