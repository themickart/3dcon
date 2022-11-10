import React from "react";
import { motion } from "framer-motion";

export const Search: React.FC = () => {
  return (
    <div className="flex-[0_0_373px] ml-[86px] mr-[125px] max-h-[70px]">
      <motion.form
        className="bg-white rounded-[35px] h-[70px] flex justify-between items-center pl-[29px] pr-[19px] overflow-hidden"
        whileTap={{ scale: 0.9 }}
      >
        <motion.input
          type="text"
          placeholder="Поиск"
          className="text-xl bg-white outline-none"
        />
        <div className="flex-[0_0_31px]">
          <img src={process.env.PUBLIC_URL + "/header/search.svg"} alt="" />
        </div>
      </motion.form>
    </div>
  );
};
