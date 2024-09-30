import React from "react";

const Button = ({
  label,
  onClick,
  width,
  disabled,
  className = "", text ="black",
  isCapitalized = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-[17px] font-bold cursor-pointer ${
        isCapitalized ? "capitalize" : ""
      } flex items-center justify-center select-none w-${width} ${
        disabled
          ? "bg-[#545454] text-[#ADBCBD]"
          : "bg-[#00FF8C] hover:opacity-45 "
      } py-[9px] bg-[#00FF8C] text-${text} rounded-lg transition-all ${className}`}
    >
      {label}
    </div>
  );
};

export default Button;
