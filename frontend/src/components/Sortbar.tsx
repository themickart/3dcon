import React from "react";

export const Sortbar: React.FC<{ params: string[] }> = ({ params }) => {
  return (
    <div
      style={{
        width: 1436,
        fontSize: 26,
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
      }}
    >
      <div
        style={{
          height: 108,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 35,
          paddingRight: 50,
        }}
      >
        <div
          style={{
            width: 220,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {params.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <div>Сортировка</div>
      </div>
    </div>
  );
};
