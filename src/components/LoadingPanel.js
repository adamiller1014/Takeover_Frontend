import React from "react";
import ScaleLoader from "react-spinners/GridLoader";

export const LoadingPanel = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen py-6 overflow-hidden backdrop-blur-lg">
      <div className="absolute z-50 top-1/2 left-1/2">
        <ScaleLoader color="white" height={10} width={1} margin={1.5} />
      </div>
    </div>
  );
};
