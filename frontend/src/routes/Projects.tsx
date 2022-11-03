import React from "react";
import { Sortbar } from "../components/Sortbar";
import { CardsList } from "../components/CardsList";

export const Projects: React.FC = () => {
  return (
    <div style={{ width: 1436, margin: "auto" }}>
      <Sortbar params={["Цена", "Формат"]} />
      <CardsList />
    </div>
  );
};
