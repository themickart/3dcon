import { FC, useState } from 'react';
import { CardsList } from '../components/CardsList/CardsList';

export const ProjectsPage: FC = () => {
    const [orderedByPriceIsDesc, setOrderedByPriceIsDesc] =
        useState<boolean>(false);
    return (
        <div className="flex flex-col">
            <div className="w-[800px] flex justify-around self-center">
                <button
                    className={`bg-[#80E0A1] text-2xl p-3 rounded-[20px] ${
                        !orderedByPriceIsDesc && 'text-[#FFFFFF]'
                    }`}
                    onClick={() => setOrderedByPriceIsDesc(false)}
                    style={{
                        boxShadow: orderedByPriceIsDesc
                            ? '0px 4px 4px rgba(0, 0, 0, 0.25)'
                            : 'none',
                    }}
                >
                    Сначала дешевые
                </button>
                <button
                    className={`bg-[#80E0A1] text-2xl p-3 rounded-[20px] ${
                        orderedByPriceIsDesc && 'text-[#FFFFFF]'
                    }`}
                    onClick={() => setOrderedByPriceIsDesc(true)}
                    style={{
                        boxShadow: !orderedByPriceIsDesc
                            ? '0px 4px 4px rgba(0, 0, 0, 0.25)'
                            : 'none',
                    }}
                >
                    Сначала дорогие
                </button>
            </div>
            <CardsList orderBy={'price'} priceIsDesc={orderedByPriceIsDesc} />
        </div>
    );
};
