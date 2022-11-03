import React from "react";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main
        style={{
          // width: 1436,
          margin: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
