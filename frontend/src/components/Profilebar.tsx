import React from "react";

export const Profilebar = () => {
  return (
    <div className="flex justify-between w-[417px] max-h-[70px] ml-[69px]">
      <div className="flex justify-between w-[266px]">
        <img src={process.env.PUBLIC_URL + "/profile/cart.svg"} alt="" />
        <img src={process.env.PUBLIC_URL + "/profile/bell.svg"} alt="" />
        <img src={process.env.PUBLIC_URL + "/profile/mail.svg"} alt="" />
      </div>
      <img src={process.env.PUBLIC_URL + "/avatars/empty.svg"} alt="" />
    </div>
  );
};
