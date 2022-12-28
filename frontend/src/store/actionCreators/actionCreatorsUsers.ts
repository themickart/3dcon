import axios from '../../axios';
import { userFetchingSuccess } from '../slices/userSlice';
import { AppDispatch } from './../index';

export const fetchOtherUser =
    (username: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(
                userFetchingSuccess((await axios.get(`user/${username}`)).data)
            );
        } catch (error) {
            console.error(error as Error);
        }
    };
