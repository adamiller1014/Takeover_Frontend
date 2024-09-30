import React, { useState } from "react";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import InputCode from "../../../components/InputCode";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { encryptFE } from "../../../utils/crypto";

const SendCode = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [code, setCode] = useState("");
  const handleComplete = (code) => {
    setCode(code);
    setEnableButton(true);
  };
  const handleIncomplete = () => {
    setEnableButton(false);
  };

  // this functions is handling verify project
  const handleSendButton = async (code) => {
    setLoading(true);
    const encryptCode = encryptFE(code);
    try {
      // await axiosInstance.put(`/projects/verify/${encryptCode}`);

      setLoading(false);
      navigate("/takeover/verify_project/confirm_setup");
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify");
      setLoading(false);
    }
  };

  return (
    <div className="flex w-10/12 flex-col gap-6 sm:w-8/12 md:w-[60%]">
      <div className="mb-0 mt-6 flex rounded-lg bg-[#F83737] bg-opacity-[32%] p-4 text-center md:mb-2 md:mt-0">
        <span className="text-[18px] leading-8 tracking-tighter text-[#FFD3D3]">
          This project is not yet live, some information or verification is
          missing, see below for details.{" "}
        </span>
      </div>
      <Board>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/verify.svg`}
              alt="solar_fire-bold"
            />
            <span className="pl-4 text-[22px]">Verify project ownership</span>
          </div>
          <span className="text-[16px] leading-6 tracking-tighter">
            Send the below code in a DM to <b>@tokentakeover</b> on Twitter from
            the project’s official Twitter page including the project title as
            entered into Token Takeover.
          </span>
          <div className="flex flex-col gap-4 p-2">
            <div className="flex justify-center gap-4">
              <InputCode
                numberOfInputs={4}
                onComplete={handleComplete}
                onIncomplete={handleIncomplete}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-center text-[16px] font-bold leading-6 tracking-tighter">
                Already logged in to the official project twitter? Use the
                button below to send the DM.
              </span>
              <div className="flex justify-center">
                <Button
                  disabled={loading || !enableButton}
                  label="Verify Project"
                  width="fit"
                  onClick={() => handleSendButton(code)}
                />
              </div>
            </div>
          </div>
        </div>
      </Board>
      <div className="flex items-center rounded-lg bg-[#00FF91] bg-opacity-30 p-6">
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/set_project.svg`}
          alt="set_project"
        />
        <span className="pl-4 text-[22px] font-bold">Metadata complete</span>
      </div>
    </div>
  );
};

export default SendCode;
