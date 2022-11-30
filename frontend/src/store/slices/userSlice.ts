import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
	// name: string;
	avatarArl: string;
	salesCount: number;
	reputation: {
		reviews: number;
		reviewsThisMonth: number;
		reviewsThisWeek: number;
		total: number;
	};
}

const initialState: IUserState = {
	// name: "",
	avatarArl: "",
	salesCount: 0,
	reputation: {
		reviews: 0,
		reviewsThisMonth: 0,
		reviewsThisWeek: 0,
		total: 0,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userFetchingSuccess(
			state,
			{
				payload: {
					avatarArl,
					// name,
					reputation,
					salesCount,
				},
			}: PayloadAction<IUserState>
		) {
			// console.log(avatarArl);
			// console.log(name);
			state.avatarArl = avatarArl;
			// state.name = name;
			state.reputation.reviews = reputation.reviews;
			state.reputation.reviewsThisMonth = reputation.reviewsThisMonth;
			state.reputation.reviewsThisWeek = reputation.reviewsThisWeek;
			state.reputation.total = reputation.total;
			state.salesCount = salesCount;
		},
	},
});

export default userSlice.reducer;
export const {userFetchingSuccess} = userSlice.actions;
