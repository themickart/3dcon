import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../constData';

export const CategoriesPage: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="grid w-[1435px] grid-cols-3 grid-rows-4 gap-y-5 mb-20">
            {categories.map(cat => (
                <div
                    className={`cursor-pointer w-[465px] h-[335px] text-[32px] text-[#80E0A1] text-center flex items-center justify-center rounded-[10px]`}
                    key={cat.title}
                    onClick={() => navigate(`/products?cat=${cat.title}`)}
                >
                    <div
                        className="w-full h-full"
                        style={{
                            background: `url(${
                                process.env.PUBLIC_URL + cat.imgUrl
                            }) #646464`,

                            WebkitFilter: 'blur(2px)',
                        }}
                    />
                    <p
                        className="absolute max-w-[374px]"
                        style={{ WebkitTextStroke: '1px #000000' }}
                    >
                        {cat.title}
                    </p>
                </div>
            ))}
        </div>
    );
};
