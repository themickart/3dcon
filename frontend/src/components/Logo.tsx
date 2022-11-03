import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Logo: React.FC = () => {
  return (
    <motion.div
      className="logo"
      style={{
        height: 67,
        fontSize: "55px",
        margin: "23px 100px 35px 50px",
        flex: "0 0 171",
      }}
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
    >
      <Link to={"/"} style={{ color: "#ccc" }}>
        <span style={{ color: "rgba(236, 218, 57, 1)" }}>3</span>
        <span style={{ color: "rgba(170, 120, 252, 1)" }}>D</span>
        <span>con</span>
      </Link>
    </motion.div>
  );
};
