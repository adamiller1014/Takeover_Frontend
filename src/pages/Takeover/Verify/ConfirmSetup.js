import React from "react";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import useCreateProjectMutation from "../../../hooks/useCreateProjectMutation";
import { generateUniqueCode } from "../../../utils/generateUniqueCode";
import { useConnectedWallets } from "thirdweb/react";
import { encryptFE } from "../../../utils/crypto";
import useStore from "../../../store/useStore";
import { toast } from "react-toastify";

const ConfirmSetup = () => {
  const editedProjectInfo = useStore((state) => state.editedProjectInfo);
  const projectMutation = useCreateProjectMutation();
  const wallets = useConnectedWallets();
  const updateProjectInfoField = useStore(
    (state) => state.updateProjectInfoField
  );

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
              src={`${process.env.PUBLIC_URL}/assets/icons/solar_fire-bold.svg`}
              alt="solar_fire-bold"
            />
            <span className="pl-4 text-[22px]">Start the burn</span>
          </div>
          <span className="text-[16px] leading-6 tracking-tighter">
            Just a few steps left to launch the takeover for <b>Katt Daddy</b>,
            click below to complete setup.
          </span>
          <Button
            label="Complete setup"
            width="fit"
            onClick={async () => {
              const memberAddress = wallets[0].getAccount().address;
              const uniqueCode = generateUniqueCode();
              try {
                const encryptCode = encryptFE(uniqueCode);
                updateProjectInfoField("uniqueCode", uniqueCode);
                await projectMutation.mutateAsync({
                  ...editedProjectInfo,
                  uniqueCode,
                });

                // open new window to authenticate
                window.open(
                  `${process.env.REACT_APP_BACKEND_URL}/api/twitter/auth/memberAddress/${memberAddress}/code/${encryptCode}`,
                  "projectWindow",
                  "width=800,height=600,scrollbars=yes"
                );

                // window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/twitter/auth/memberAddress/${memberAddress}/code/${uniqueCode}`// Navigate to next twitter auth
              } catch (error) {
                toast.error("Creating project failed."); // Display error message
              }
            }}
          />
        </div>
      </Board>
      <div className="flex items-center rounded-lg bg-[#00FF91] bg-opacity-30 p-6">
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/set_project.svg`}
          alt="set_project"
        />
        <span className="pl-4 text-[22px] font-bold">Metadata complete</span>
      </div>
      <div className="flex items-center rounded-lg bg-[#00FF91] bg-opacity-30 p-6">
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/verify.svg`}
          alt="set_project"
        />
        <span className="pl-4 text-[22px] font-bold">
          Project ownership verified
        </span>
      </div>
    </div>
  );
};

export default ConfirmSetup;
