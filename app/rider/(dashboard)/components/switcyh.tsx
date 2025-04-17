"use client";
export const dynamic = "force-dynamic";

import clsx from "clsx";
import { useState } from "react";

export const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className={clsx(
        " lg:w-[83px] z-0 lg:h-[47px] w-[65px] h-[37px] items-center flex justify-end rounded-[285px] bg-[#00ABFD] px-[6px]",
        isChecked ? "bg-[#CDD0D5]" : ""
      )}
    >
      <div
        onClick={() => setIsChecked(!isChecked)}
        className={` lg:size-[36px] size-[28px] rounded-full cursor-pointer  bg-white  grid place-items-center ${
          isChecked ? "-translate-x-full bg-[#FFFFFF]" : ""
        }`}
      >
        <div
          className={clsx(
            " lg:size-[12px] size-[9px] rounded-full bg-primary",
            isChecked ? "bg-[#CDD0D5]" : ""
          )}
        ></div>
      </div>
    </div>
  );
};
