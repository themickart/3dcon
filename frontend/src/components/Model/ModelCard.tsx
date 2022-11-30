import React, { useState } from 'react';
// import { useForm, SubmitHandler } from "react-hook-form";
import styles from './ModelCard.module.scss';
// import { useAppDispatch } from "../../hooks/reduxHooks";
// import { deleteModel } from "../../store/actionCreators";
import { AnimatePresence, motion } from 'framer-motion';
import useOutside from '../../hooks/outside';
import { IProduct } from '../../types/types';

// interface InputType {
//   id: number;
//   title: string;
//   category: string;
//   price: string;
// }

export const ModelCard: React.FC<IProduct> = ({
    category,
    coverArl,
    price,
    name,
    viewsCount,
    description,
}) => {
    // const dispatch = useAppDispatch();
    const basePath = process.env.PUBLIC_URL;
    const [isVisibleForm, setIsVisibleForm] = useState(false);
    // const { register, handleSubmit, setValue } = useForm<InputType>();
    const { ref, isShow, setIsShow } = useOutside(false);

    // const onSubmit: SubmitHandler<InputType> = ({
    //   id,
    //   category,
    //   price,
    //   title,
    // }) => {
    //   setIsVisibleForm(false);
    //   dispatch(editModel(category, price, title, id));
    // };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                layout
                className={styles.model}
                animate={{ opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'tween' }}
            >
                <div onClick={() => setIsShow((prev) => !prev)}>
                    {isShow ? (
                        <div
                            ref={ref}
                            className="absolute z-10 pb-5 bg-[#80e0a1] cursor-pointer
              w-[300px] flex flex-col justify-between items-center rounded-[40px] my-10 ml-8 mr-20"
                        >
                            <img
                                className={styles.model__infoImg}
                                src={coverArl}
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
                            src={coverArl}
                            alt=""
                        />
                    )}
                </div>
                <div
                    className={`w-[546px] h-[132px] mt-[67px] flex justify-between ${
                        isShow && 'ml-[362px]'
                    }`}
                >
                    {isVisibleForm ? (
                        // <form
                        //   className="h-[100%] w-[45%] flex flex-col justify-around border"
                        //   onSubmit={handleSubmit(onSubmit)}
                        // >
                        //   <input
                        //     className="border rounded-xl mx-3 text-center"
                        //     type="text"
                        //     placeholder="Название"
                        //     defaultValue={title}
                        //     {...register("title", { required: true })}
                        //   />
                        //   <input
                        //     className="border rounded-xl mx-3 text-center"
                        //     type="text"
                        //     placeholder="Категория"
                        //     defaultValue={category}
                        //     {...register("category", { required: true })}
                        //   />
                        //   <input
                        //     className="border rounded-xl mx-3 text-center"
                        //     type="text"
                        //     placeholder="Цена"
                        //     defaultValue={price}
                        //     {...register("price", { required: true })}
                        //   />
                        //   <button
                        //     type="submit"
                        //     className="border rounded-xl mx-3 hover:bg-[#469fda]"
                        //     onClick={() => setValue("id", id)}
                        //   >
                        //     Сохранить
                        //   </button>
                        // </form>
                        <></>
                    ) : (
                        <div
                            className={'flex flex-col justify-between w-[50%]'}
                        >
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
                    )}
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
                    <button onClick={() => setIsVisibleForm((prev) => !prev)}>
                        <img src={basePath + '/profile/edit.svg'} alt="" />
                    </button>
                    <button>
                        <img src={basePath + '/profile/hide.svg'} alt="" />
                    </button>
                    <button
                        onClick={() => {
                            // dispatch(deleteModel(id))
                        }}
                    >
                        <img src={basePath + '/profile/delete.svg'} alt="" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
