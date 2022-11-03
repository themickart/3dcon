import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar: React.FC<{
  menuItems: { title: string; path: string }[];
}> = ({ menuItems }) => {
  return (
    <nav
      className="menu"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flex: "0 0 573px",
      }}
    >
      {menuItems.map(({ title, path }, index) => (
        <motion.div
          className="menu-item"
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{
            backgroundColor: "#ccc",
            borderRadius: "25%",
            scale: 1.2,
          }}
        >
          <Link style={{ textDecoration: "none", color: "#ccc" }} to={path}>
            {title}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};
