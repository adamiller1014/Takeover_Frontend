import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  useActiveWalletConnectionStatus,
  useConnectedWallets,
} from "thirdweb/react";
import Button from "../../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { erc20Abi } from "viem";
import { ethers } from "ethers";
import takeoverAbi from "../../../../abis/TokenTakeOver_abi.json";
import { useProjectById } from "../../../../hooks/useProjectById";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";
import { LoadingPanel } from "../../../../components/LoadingPanel";

const BurnConfirmation = () => {
  const navigation = useNavigate();
  const burningTokenAmount = localStorage.getItem("burningTokenAmount");
  const wallets = useConnectedWallets();
  const connectionStatus = useActiveWalletConnectionStatus();
  const { projectId } = useParams();
  const [percentage, setPercentage] = useState(0);
  const [loadingWide, setLoadingWide] = useState(false);

  const {
    data: project,
    isLoading,
    isError,
    refetch,
  } = useProjectById({ _id: projectId });
  // Approve tokens and then join the project
  const joinProjectMutation = useMutation({
    mutationFn: async ({
      memberAddress,
      projectId,
      amount,
      totalWalletAmount,
    }) => {
      const response = await axiosInstance.post("/projects/join", {
        memberAddress,
        projectId,
        amount,
        totalWalletAmount,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Joined project and tokens locked successfully!");
      setLoadingWide(false);
      navigation(`/details/${projectId}`);
    },
    onError: (error) => {
      toast.error("Joining project failed.");
    },
  });
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const tokenContract = new ethers.Contract(
    project.tokenAddress,
    erc20Abi,
    provider
  );

  const calcPercentage = async () => {
    if (connectionStatus === "connected" && wallets?.length > 0) {
      try {
        const walletBalance = await tokenContract.balanceOf(
          wallets[0].getAccount().address
        );

        const formattedBalance = ethers.utils.formatUnits(
          walletBalance,
          project.tokenDecimals ? project.tokenDecimals : 18
        );

        const calculatedPercentage = (
          (Number(burningTokenAmount) / Number(formattedBalance)) *
          100
        )
          .toFixed()
          .toString();

        setPercentage(calculatedPercentage);
      } catch (error) {
        console.error("Error calculating percentage:", error);
        toast.error("Failed to calculate token percentage.");
      }
    }
  };

  useEffect(() => {
    if (connectionStatus !== "connected" || wallets?.length === 0)
      navigation(`/details/${projectId}/connect_wallet`);
    else calcPercentage();
  }, [connectionStatus, navigation, projectId, wallets]);
  if (isLoading) return <LoadingSpinner />;
  if (loadingWide) return <LoadingPanel />;
  const handleJoinProject = async () => {
    try {
      setLoadingWide(true);
      if (
        connectionStatus === "connected" &&
        wallets.length > 0 &&
        Number(burningTokenAmount) > 0
      ) {
        const allowance = await tokenContract.allowance(
          wallets[0]?.getAccount().address,
          process.env.REACT_APP_TAKEOVER_SMARTCONTRACT_ADDRESS
        );

        // If allowance is less than the amount to burn, request approval
        const signer = provider.getSigner();
        if (
          Number(allowance) <
          Number(
            ethers.utils.parseUnits(
              burningTokenAmount.toString(),
              project.tokenDecimals ? project.tokenDecimals : 18
            )
          )
        ) {
          const tokenContractWithSigner = new ethers.Contract(
            project.tokenAddress,
            erc20Abi,
            signer
          );
          const approvalTx = await tokenContractWithSigner.approve(
            process.env.REACT_APP_TAKEOVER_SMARTCONTRACT_ADDRESS,
            ethers.constants.MaxUint256
          );
          await approvalTx.wait();

          toast.success("Approval successful!");
        } else {
          toast.info("Sufficient allowance, no need for approval.");
        }

        // CALLING SMART CONTRACT FUNCTION

        const takeOverContract = new ethers.Contract(
          process.env.REACT_APP_TAKEOVER_SMARTCONTRACT_ADDRESS,
          takeoverAbi,
          signer
        );
        const tx = await takeOverContract.lockTokens(
          project.tokenAddress,
          ethers.utils.parseUnits(
            burningTokenAmount.toString(),
            project.tokenDecimals ? project.tokenDecimals : 18
          ),
          {
            gasLimit: 2000000,
          }
        );
        await tx.wait();
        toast.success("Locking Tokens successful!");

        const totalWalletAmount = await tokenContract.balanceOf(
          wallets[0].getAccount().address
        );

        joinProjectMutation.mutate({
          memberAddress: wallets[0].getAccount().address,
          projectId,
          amount: Number(burningTokenAmount),
          totalWalletAmount: Number(
            ethers.utils.formatUnits(
              totalWalletAmount,
              project.tokenDecimals ? project.tokenDecimals : 18
            )
          ),
        });
        setLoadingWide(false);
      }
    } catch (error) {
      console.error("Error during approval or joining project:", error);
      toast.error("Approval or joining project failed.");
      setLoadingWide(false);
    }
  };

  return (
    <div className="flex w-11/12 flex-col gap-6 md:w-[60%]">
      <div className="min-h-screen p-2 sm:p-6">
        <div className="flex py-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/solar_fire-bold.svg`}
            alt="solar_fire-bold"
          />
          <span className="pl-4 text-[22px]">Burn baby burn</span>
        </div>

        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="mb-2 mt-3 flex flex-col rounded-lg bg-[#F83737] bg-opacity-[32%] p-4 text-center">
            <span className="text-[18px] leading-8 tracking-tighter text-[#FFD3D3]">
              You are about to commit {percentage}%{" "}
              <b>
                ({burningTokenAmount.toString()} ${project.tokenSymbol})
              </b>{" "}
              of your current holding in this wallet.
            </span>
            <span className="text-[18px] leading-8 tracking-tighter text-[#FFD3D3]">
              This action is irreversible and the tokens will be immediately
              transferred.
            </span>
          </div>

          <span className="text-[16px] leading-6 tracking-tighter">
            By clicking Add tokens to burn pile below, you acknowledge that you
            have read and understand the above warning and wish to proceed with
            this action.
          </span>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-center">
              <Button
                label="Add tokens to burn pile"
                width="fit"
                onClick={handleJoinProject}
              />
            </div>
            <span
              className="py-[9px] text-center text-[12px] text-[#00ff91]"
              onClick={() => navigation(-1)}
            >
              <span className="cursor-pointer border-b border-[#00ff91] text-sm leading-6">
                Back
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurnConfirmation;
