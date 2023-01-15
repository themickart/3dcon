import axios from '../../axios';
import { otherUserFetchingSuccess } from '../slices/otherUserSlice';
import { AppDispatch } from './../index';

export const fetchOtherUser =
    (username: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(
                otherUserFetchingSuccess(
                    (await axios.get(`user/${username}`)).data
                )
            );
        } catch (error) {
            console.error(error as Error);
        }
    };
