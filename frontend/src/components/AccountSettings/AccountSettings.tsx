import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

export const AccountSettings: FC = () => {
    const { username } = useAppSelector(state => state.authReducer);
    return (
        <div className="w-[303px] h-[500px] rounded-[25px] border py-6 px-4">
            <h1 className="text-[25px] mb-4">{username}</h1>
            <div className="flex flex-col justify-between h-[199px]">
                <button className="bg-[#D9D9D9] text-xl w-[270px]">
                    Аккаунт
                </button>
                <button className="bg-[#D9D9D9] text-xl w-[270px]">
                    Настройки
                </button>
                <button className="bg-[#D9D9D9] text-xl w-[270px]">
                    Покупки
                </button>
            </div>
            <button className="bg-[#D9D9D9] text-xl w-[270px] mt-[158px]">
                Выйти
            </button>
        </div>
    );
};
