import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Logo: React.FC = () => {
  return (
    <motion.div
      className="logo h-[67px] text-[55px] flex-[0_0_171px] m-[15px_100px_35px_50px]"
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
    >
      <Link to={"/"} className="text-[#ccc]">
        <span className="text-[#ECDA39]">3</span>
        <span className="text-[#AA78FC]">D</span>
        <span>con</span>
      </Link>
    </motion.div>
  );
};
