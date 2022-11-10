import React from "react";
import { Sortbar } from "../components/Sortbar";
import { CardsList } from "../components/CardsList";

export const Projects: React.FC = () => {
  return (
    <div className="w-[1436px] m-auto">
      <Sortbar params={["Цена", "Формат"]} />
      <CardsList />
    </div>
  );
};
