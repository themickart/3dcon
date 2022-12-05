import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	isAuth: boolean;
	username: string;
	token: string;
}

interface PayloadUser {
	username: string;
	token: string;
}

const initialState: AuthState = {
	isAuth: !!localStorage.getItem('token'),
	username: localStorage.getItem('username') ?? '',
	token: localStorage.getItem('token') ?? '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.isAuth = false;
			state.token = '';
			state.username = '';
			localStorage.removeItem('token');
			localStorage.removeItem('username');
		},
		loginSuccess(
			state,
			{payload: {token, username}}: PayloadAction<PayloadUser>
		) {
			state.isAuth = !!token;
			state.token = token;
			state.username = username;
			localStorage.setItem('token', token);
			localStorage.setItem('username', username);
		},
	},
});

export default authSlice.reducer;
export const {loginSuccess, logout} = authSlice.actions;
