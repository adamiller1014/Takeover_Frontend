import React from "react";

import SetProject from "./SetProject";

const Takeover = () => {
  return (
    <div
      className="flex items-center justify-center w-full h-screen pt-10 text-white "
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/admin_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <SetProject />
    </div>
  );
};

export default Takeover;
