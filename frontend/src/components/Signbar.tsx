import React from "react";

export const Signbar: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flex: "0 0 354px",
        marginRight: 88,
      }}
    >
      <div>Регистрация</div>
      <div>Вход</div>
    </div>
  );
};
