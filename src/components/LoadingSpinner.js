import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export const LoadingSpinner = () => {
  return (
    <div className="flex w-full items-center justify-center py-6">
      <ScaleLoader color="white" height={15} width={2} margin={1.5} />
    </div>
  );
};
