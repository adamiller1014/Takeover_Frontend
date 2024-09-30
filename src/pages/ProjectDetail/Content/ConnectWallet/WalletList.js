import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useActiveWallet,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";

import { WalletOptions } from "../../../../wallet-option";
import { useWalletTokenBalance } from "../../../../hooks/useWalletTokenBalance";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";
import { useCheckIsJoined } from "../../../../hooks/useCheckIsJoined";

const WalletList = ({ selected_project }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const wallet = useActiveWallet();
  const { data: tokens, isLoading } = useWalletTokenBalance(
    wallet?.getAccount()?.address,
    "0x" + wallet?.getChain()?.id?.toString(16),
    selected_project.tokenAddress
  );
  const connectionStatus = useActiveWalletConnectionStatus();

  const { data: isJoined, refetch } = useCheckIsJoined({
    memberAddress:
      connectionStatus === "connected" && wallet
        ? wallet?.getAccount()?.address
        : null,
    projectId: selected_project?._id,
  });

  useEffect(() => {
    refetch();
  }, [connectionStatus, wallet]);

  useEffect(() => {
    if (isJoined) {
      navigate(`/details/${projectId}`);
    }
    if (tokens) {
      if (tokens?.length > 0) navigate(`/details/${projectId}/burn_baby_burn`);
      else navigate(`/details/${projectId}/dosent_have_token`);
    }
  }, [navigate, projectId, tokens, tokens?.length, isJoined]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="flex flex-wrap justify-center gap-7 px-4 py-12">
      <WalletOptions />
    </div>
  );
};

export default WalletList;
