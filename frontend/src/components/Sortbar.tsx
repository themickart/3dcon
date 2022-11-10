import React from "react";

export const Sortbar: React.FC<{ params: string[] }> = ({ params }) => {
  return (
    <div className="w-[1436px] text-[26px] border-t border-solid border-black border-b">
      <div className="h-[108px] flex items-center justify-between pl-[35px] pr-[50px]">
        <div className="w-[220px] flex justify-between">
          {params.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <div>Сортировка</div>
      </div>
    </div>
  );
};
