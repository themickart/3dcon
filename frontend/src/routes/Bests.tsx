import { FC, useState } from 'react';
import { CardsList } from '../components/CardsList/CardsList';

export const Bests: FC = () => {
    const [orderBy, setOrderBy] = useState<'likes_count' | 'views_count'>(
        'likes_count'
    );
    return (
        <div className="flex flex-col">
            <div className="w-[800px] flex justify-around self-center">
                <button
                    className={`bg-[#80E0A1] text-2xl p-3 rounded-[20px] ${
                        orderBy === 'likes_count' && 'text-[#FFFFFF]'
                    }`}
                    onClick={() => setOrderBy('likes_count')}
                    style={{
                        boxShadow:
                            orderBy === 'views_count'
                                ? '0px 4px 4px rgba(0, 0, 0, 0.25)'
                                : 'none',
                    }}
                >
                    Самые залайканные
                </button>
                <button
                    className={`bg-[#80E0A1] text-2xl p-3 rounded-[20px] ${
                        orderBy === 'views_count' && 'text-[#FFFFFF]'
                    }`}
                    onClick={() => setOrderBy('views_count')}
                    style={{
                        boxShadow:
                            orderBy === 'likes_count'
                                ? '0px 4px 4px rgba(0, 0, 0, 0.25)'
                                : 'none',
                    }}
                >
                    Самые популярные
                </button>
            </div>
            <CardsList orderBy={orderBy} />
        </div>
    );
};
