import React from "react";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const BurnSuccess = () => {
  const navigation = useNavigate();
  return (
    <div
      className="flex items-center justify-center w-full pt-10 text-white "
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/admin_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="sm:w-[52%] w-[80%] md:mt-[124px] mt-[80px] ">
        <Board>
          <div className="p-6">
            <div className="flex py-4">
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/success.svg`}
                alt="success"
              />
              <span className="pl-4 text-[22px]">
                Success, Katt Daddy is live!
              </span>
            </div>

            <div className="flex items-center justify-center">
              <img
                className="lg:h-auto h-[300px]"
                src={`${process.env.PUBLIC_URL}/assets/lottie-tto-success.png`}
                alt="success"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                width="fit"
                label="Project dashboard"
                onClick={() => {
                  navigation(
                    `/details/${localStorage.getItem("createdProjectId")}`
                  );
                }}
              ></Button>
            </div>
          </div>
        </Board>
      </div>
    </div>
  );
};

export default BurnSuccess;
