import React, { useEffect } from "react";
import Board from "../../../../components/Board";
import Button from "../../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectById } from "../../../../hooks/useProjectById";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";
import {
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useConnectedWallets,
  useDisconnect,
} from "thirdweb/react";

const DoesNotToken = () => {
  const navigation = useNavigate();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const { projectId } = useParams();
  const connectionStatus = useActiveWalletConnectionStatus();
  const wallets = useConnectedWallets();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });
  useEffect(() => {
    if (connectionStatus !== "connected" || wallets?.length === 0)
      navigation(`/details/${projectId}/connect_wallet`);
  }, [connectionStatus, navigation, projectId, wallets]);
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="flex items-center justify-center w-full py-6 text-red-500">
        Error loading project.
      </p>
    );
  return (
    <Board className="flex min-h-screen w-11/12 flex-col md:w-[60%]">
      <div className="p-6">
        <div className="flex py-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/choose_wallet.svg`}
            alt="choose_wallet"
          />
          <span className="pl-4 text-[22px]">Choose a wallet provider</span>
        </div>

        <div className="flex flex-col gap-6 px-4 py-3">
          <div className="mb-2 mt-3 flex flex-col rounded-lg bg-[#F83737] bg-opacity-[32%] p-4 text-center">
            <span className="text-[18px] leading-8 tracking-tighter text-[#FFD3D3]">
              The chosen wallet is not currently holding any $
              {project.tokenSymbol}
            </span>
            <span className="text-[18px] leading-8 tracking-tighter text-[#FFD3D3]">
              Please choose a different wallet.
            </span>
          </div>

          <div className="flex justify-center gap-6">
            <Button
              label="Try another wallet"
              width="fit"
              onClick={async () => {
                await disconnect(wallet);
                navigation(`/details/${projectId}/connect_wallet`);
              }}
            />
          </div>
        </div>
      </div>
    </Board>
  );
};

export default DoesNotToken;
