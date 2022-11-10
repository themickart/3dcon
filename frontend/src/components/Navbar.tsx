import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar: React.FC<{
  menuItems: { title: string; path: string }[];
}> = ({ menuItems }) => {
  return (
    <nav className="menu flex justify-between flex-[0_0_573px]">
      {menuItems.map(({ title, path }) => (
        <motion.div
          className="menu-item"
          key={title}
          whileHover={{ scale: 1.1 }}
          whileTap={{
            backgroundColor: "#ccc",
            borderRadius: "25%",
            scale: 1.2,
          }}
        >
          <Link to={path} className="text-[#ccc]">
            {title}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};
