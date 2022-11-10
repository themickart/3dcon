import React from "react";
import { Link } from "react-router-dom";

export const Signbar: React.FC = () => {
  return (
    <div className="flex justify-between flex-[0_0_354px] ml-[125px]">
      <div>Регистрация</div>
      <Link to={"/profile"}>Вход</Link>
    </div>
  );
};
