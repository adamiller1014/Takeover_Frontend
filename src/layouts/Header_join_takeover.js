import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  useActiveWallet,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";
import { useProjectById } from "../hooks/useProjectById";
import { useCheckIsJoined } from "../hooks/useCheckIsJoined";

const HeaderJoinTakeover = () => {
  const projectId = useLocation()?.pathname.split("/")[2];
  const navigate = useNavigate();
  const wallet = useActiveWallet();
  const { data: project } = useProjectById({ _id: projectId });

  const connectionStatus = useActiveWalletConnectionStatus();

  const { data: isJoined, refetch } = useCheckIsJoined({
    memberAddress:
      connectionStatus === "connected" && wallet
        ? wallet?.getAccount()?.address
        : null,
    projectId: project?._id,
  });

  useEffect(() => {
    refetch();
  }, [connectionStatus, wallet]);
  return (
    <div className="absolute right-1/2 top-0 z-50 flex w-full max-w-[1358px] translate-x-1/2 items-center justify-between bg-opacity-30 px-[48px] py-[24px]">
      <img
        src={`${process.env.PUBLIC_URL}/assets/icons/logo.svg`}
        alt="Group Icon"
        className="w-52 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="">
        <Button
          width="auto"
          label={isJoined ? "Add to burn pile" : "Join Takeover"}
          onClick={() => {
            navigate(`${window.location.pathname}/connect_wallet`);
          }}
        />
      </div>
    </div>
  );
};

export default HeaderJoinTakeover;
