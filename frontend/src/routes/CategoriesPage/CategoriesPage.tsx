import { motion } from 'framer-motion';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../../constData';

export const CategoriesPage: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="pb-20 flex flex-col">
            <div className="grid w-[1435px] grid-cols-3 grid-rows-4 gap-y-5 mb-36">
                {categories.map(cat => (
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 1 / 1.01 }}
                        className={`cursor-pointer w-[465px] h-[335px] text-[32px] text-[#80E0A1] text-center flex items-center justify-center bg-[#646464] rounded-[10px]`}
                        key={cat.title}
                        onClick={() => navigate(`/products?cat=${cat.title}`)}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                background: `url(${
                                    process.env.PUBLIC_URL + cat.imgUrl
                                })`,
                                backgroundPosition: 'left',
                                WebkitFilter: 'blur(2px)',
                            }}
                        />
                        <p
                            className="absolute max-w-[374px]"
                            style={{ WebkitTextStroke: '1px #000000' }}
                        >
                            {cat.title}
                        </p>
                    </motion.div>
                ))}
            </div>
            <Link
                to="/bests"
                className="m-auto text-[26px] rounded-[60px] bg-[#80E0A1] w-[450px] h-[120px] flex justify-center items-center"
            >
                <p>перейти в лучшие</p>
            </Link>
        </div>
    );
};
