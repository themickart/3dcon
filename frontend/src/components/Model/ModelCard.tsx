import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./ModelCard.module.scss";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { deleteModel, editModel } from "../../store/actionCreators";
import { motion, AnimatePresence } from "framer-motion";
import useOutside from "../../hooks/outside";

export interface ModelProps {
  id: string;
  title: string;
  imgUrl: string;
  category: string;
  price: string;
  sales: string;
  views: string;
}

interface InputType {
  id: string;
  title: string;
  category: string;
  price: string;
}

export const ModelCard: React.FC<ModelProps> = ({
  id,
  category,
  imgUrl,
  price,
  sales,
  title,
  views,
}) => {
  const dispatch = useAppDispatch();
  const basePath = process.env.PUBLIC_URL;
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const { register, handleSubmit, setValue } = useForm<InputType>();
  const { ref, isShow, setIsShow } = useOutside(false);

  const onSubmit: SubmitHandler<InputType> = ({
    id,
    category,
    price,
    title,
  }) => {
    setIsVisibleForm(false);
    dispatch(editModel(category, price, title, id));
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        className={styles.model}
        animate={{ opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "tween" }}
      >
        <div onClick={() => setIsShow((prev) => !prev)}>
          {isShow ? (
            <div
              ref={ref}
              className="absolute z-10 pb-5 bg-[#80e0a1] cursor-pointer w-[300px] flex flex-col justify-between items-center rounded-[40px] my-10 ml-8 mr-20"
            >
              <img
                className={styles.model__infoImg}
                src={basePath + imgUrl}
                alt=""
              />
              <div className="px-4">
                <div className="text-center">
                  <h3 className="text-3xl">{title}</h3>
                  <h4 className="text-2xl">Account</h4>
                  <p className="text-xl mb-12">
                    Adipisicing in aute sit id. Cillum fugiat sint ea et nisi
                    proident eiusmod adipisicing sunt et esse. Adipisicing aute
                    nulla non in sint ea est fugiat sit dolore.
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl">Категория: {category}</h4>
                  <h4 className="text-xl my-6">Информация:</h4>
                  <p className="text-xl mb-14">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Doloremque aspernatur mollitia consectetur accusamus
                    voluptate eum dicta temporibus hic? Illo odio libero in
                    corporis architecto ullam, maiores iure eaque provident
                    ducimus.
                  </p>
                  <div className="flex justify-between">
                    <div>
                      <p>{sales}</p>
                    </div>
                    <div>
                      <p>{views}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <img className={styles.model__img} src={basePath + imgUrl} alt="" />
          )}
        </div>
        <div
          className={`w-[546px] h-[132px] mt-[67px] flex justify-between   ${
            isShow && "ml-[362px]"
          }`}
        >
          {isVisibleForm ? (
            <form
              className="h-[100%] w-[45%] flex flex-col justify-around border"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="border rounded-xl mx-3 text-center"
                type="text"
                placeholder="Название"
                defaultValue={title}
                {...register("title", { required: true })}
              />
              <input
                className="border rounded-xl mx-3 text-center"
                type="text"
                placeholder="Категория"
                defaultValue={category}
                {...register("category", { required: true })}
              />
              <input
                className="border rounded-xl mx-3 text-center"
                type="text"
                placeholder="Цена"
                defaultValue={price}
                {...register("price", { required: true })}
              />
              <button
                type="submit"
                className="border rounded-xl mx-3 hover:bg-[#469fda]"
                onClick={() => setValue("id", id)}
              >
                Сохранить
              </button>
            </form>
          ) : (
            <div className={"flex flex-col justify-between w-[50%]"}>
              <p>
                <span className="opacity-30">Название:</span>{" "}
                <span className="opacity-50">{title}</span>
              </p>
              <p>
                <span className="opacity-30">Категория:</span>{" "}
                <span className="opacity-50">{category}</span>
              </p>
              <p>
                <span className="opacity-30">Цена:</span>{" "}
                <span className="opacity-50">{price}</span>
              </p>
            </div>
          )}
          <div className="flex flex-col w-[50%]">
            <p className={"mb-6"}>
              {" "}
              <span className="opacity-30">Продажи:</span>{" "}
              <span className="opacity-50">{sales}</span>
            </p>
            <p>
              <span className="opacity-30">Просмотры:</span>{" "}
              <span className="opacity-50">{views}</span>
            </p>
          </div>
        </div>

        <div className={styles.model__functions}>
          <button onClick={() => setIsVisibleForm((prev) => !prev)}>
            <img src={basePath + "/profile/edit.svg"} alt="" />
          </button>
          <button>
            <img src={basePath + "/profile/hide.svg"} alt="" />
          </button>
          <button onClick={() => dispatch(deleteModel(id))}>
            <img src={basePath + "/profile/delete.svg"} alt="" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
