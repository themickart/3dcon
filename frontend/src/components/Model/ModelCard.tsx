import { AnimatePresence, motion } from 'framer-motion';
import { FC, useContext } from 'react';
import useOutside from '../../hooks/outside';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { deleteModelById } from '../../store/actionCreators/actionCreatorsProduct';
import { IProduct } from '../../types/types';
import styles from './ModelCard.module.scss';
import ModelContext from './ModelContext';
import { ModelInfoEdit } from './ModelInfoEdit';

export interface InputType {
    id: number;
    name: string;
    category: string;
    price: number;
}

export const ModelCard: FC<
    Omit<
        IProduct,
        | 'createdAt'
        | 'isViewed'
        | 'isLiked'
        | 'tags'
        | 'license'
        | 'likesCount'
        | 'author'
        | 'gallery'
        | 'info'
    >
> = ({ id, category, coverUrl, price, name, viewsCount, description }) => {
    const setIsVisibleForm = useContext(ModelContext)[1];
    const basePath = process.env.PUBLIC_URL;
    const { ref, isShow, setIsShow } = useOutside(false);
    const token = useAppSelector(state => state.authReducer.token);
    const dispatch = useAppDispatch();

    const deleteModelHandler = () => {
        dispatch(deleteModelById(id!, token));
    };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                layout
                className={styles.model}
                animate={{ opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'tween' }}
            >
                <div onClick={() => setIsShow(prev => !prev)}>
                    {isShow ? (
                        <div
                            ref={ref}
                            className="absolute z-10 pb-5 bg-[#80e0a1] cursor-pointer w-[300px] flex flex-col justify-between items-center rounded-[40px] my-10 ml-8 mr-20"
                        >
                            <img
                                className={styles.model__infoImg}
                                src={coverUrl}
                                alt=""
                            />
                            <div className="px-4">
                                <h4 className="text-xl my-6">Информация:</h4>
                                <p className="text-xl mb-14">{description}</p>
                            </div>
                        </div>
                    ) : (
                        <img
                            className={styles.model__img}
                            src={coverUrl}
                            alt=""
                        />
                    )}
                </div>
                <div
                    className={`w-[546px] h-[132px] mt-[67px] flex justify-between ${
                        isShow && 'ml-[362px]'
                    }`}
                >
                    <ModelInfoEdit
                        category={category}
                        id={id!}
                        name={name}
                        price={price}
                    />
                    <div className={'flex flex-col justify-between w-[50%]'}>
                        <p>
                            <span className="opacity-30">Название:</span>{' '}
                            <span className="opacity-50">{name}</span>
                        </p>
                        <p>
                            <span className="opacity-30">Категория:</span>{' '}
                            <span className="opacity-50">{category}</span>
                        </p>
                        <p>
                            <span className="opacity-30">Цена:</span>{' '}
                            <span className="opacity-50">{price}</span>
                        </p>
                    </div>
                    <div className="flex flex-col w-[50%]">
                        <p className={'mb-6'}>
                            {' '}
                            <span className="opacity-30">Продажи:</span>{' '}
                            <span className="opacity-50">0</span>
                        </p>
                        <p>
                            <span className="opacity-30">Просмотры:</span>{' '}
                            <span className="opacity-50">{viewsCount}</span>
                        </p>
                    </div>
                </div>

                <div className={styles.model__functions}>
                    <button onClick={() => setIsVisibleForm(true)}>
                        <img src={basePath + '/profile/edit.svg'} alt="" />
                    </button>
                    <button>
                        <img src={basePath + '/profile/hide.svg'} alt="" />
                    </button>
                    <button onClick={deleteModelHandler}>
                        <img src={basePath + '/profile/delete.svg'} alt="" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
