import React from "react";
import { motion } from "framer-motion";

export const Search: React.FC = () => {
  return (
    <div
      style={{
        flex: "0 0 373px",
        marginLeft: 86,
        marginRight: 125,
        maxHeight: 70,
      }}
    >
      <motion.form
        style={{
          background: "white",
          borderRadius: "35px",
          height: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 29,
          paddingRight: 19,
          overflow: "hidden",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.input
          type="text"
          placeholder="Поиск"
          style={{
            fontSize: "20px",
            background: "white",
            border: "none",
            outline: "none",
          }}
        />
        <div
          style={{
            flex: "0 0 31px",
          }}
          onClick={() => {}}
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.6093 28.7796L21.7149 19.8789C23.4684 17.776 24.523 15.0886 24.523 12.1535C24.523 5.45731 19.0276 0.0126953 12.2679 0.0126953C5.50815 0.0126953 0 5.46366 0 12.1598C0 18.856 5.49544 24.3006 12.2551 24.3006C15.1268 24.3006 17.7696 23.3159 19.8662 21.6704L28.7923 30.5966C29.3133 31.1175 30.0883 31.1175 30.6093 30.5966C31.1302 30.0756 31.1302 29.3005 30.6093 28.7796ZM2.60478 12.1598C2.60478 6.89947 6.9376 2.62382 12.2551 2.62382C17.5727 2.62382 21.9055 6.89947 21.9055 12.1598C21.9055 17.4202 17.5727 21.6959 12.2551 21.6959C6.9376 21.6959 2.60478 17.4139 2.60478 12.1598Z"
              fill="#80E0A1"
            />
          </svg>
        </div>
      </motion.form>
    </div>
  );
};
