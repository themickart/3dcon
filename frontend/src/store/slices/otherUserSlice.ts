import { IAuthor } from './../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState extends IAuthor {}

const initialState: IUserState = {
    name: '',
    avatarUrl: '',
    salesCount: 0,
    reputation: {
        reviews: 0,
        reviewsThisMonth: 0,
        reviewsThisWeek: 0,
        total: 0,
    },
};

const otherUserSlice = createSlice({
    name: 'otherUser',
    initialState,
    reducers: {
        otherUserFetchingSuccess(
            state,
            {
                payload: { avatarUrl, reputation, salesCount },
            }: PayloadAction<IUserState>
        ) {
            state.avatarUrl = avatarUrl.length
                ? avatarUrl
                : '/avatars/empty.svg';
            state.reputation.reviews = reputation.reviews;
            state.reputation.reviewsThisMonth = reputation.reviewsThisMonth;
            state.reputation.reviewsThisWeek = reputation.reviewsThisWeek;
            state.reputation.total = reputation.total;
            state.salesCount = salesCount;
        },
    },
});

export default otherUserSlice.reducer;
export const { otherUserFetchingSuccess } = otherUserSlice.actions;
