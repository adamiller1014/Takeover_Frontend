import React, { useState, useEffect } from "react";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import ProgressSlider from "../../../components/ProgressSlider";
import { useNavigate, useLocation } from "react-router-dom";
import { useProjectById } from "../../../hooks/useProjectById";
import {
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useConnectedWallets,
} from "thirdweb/react";
import { erc20Abi } from "viem";
import { ethers } from "ethers";
import takeoverAbi from "../../../abis/TokenTakeOver_abi.json";
import TakeOverBurnChooseWallet from "./ChooseWallet";
import { useWalletTokenBalance } from "../../../hooks/useWalletTokenBalance";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { formatBalance } from "../../ProjectDetail/Content/BurnBabyBurn";
import { LoadingPanel } from "../../../components/LoadingPanel";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import TokensBurned from "../../Admin/Admin_ProjectDetail/Content/TokensBurned";

const StartBurnPile = () => {
  const projectId = localStorage.getItem("createdProjectId");

  const navigation = useNavigate();
  const location = useLocation();
  const token = location.state?.token;
  const [checkOn, setCheckOn] = useState(false);
  const [sliderOn, setSliderOn] = useState(false);
  const [amount, setAmount] = useState(20000);
  const [percentage, setPercentage] = useState(5);
  const connectionStatus = useActiveWalletConnectionStatus();
  const wallets = useConnectedWallets();
  const wallet = useActiveWallet();
  const [loadingWide, setLoadingWide] = useState(false);
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });

  const { data: tokens, isLoading: loading_token } = useWalletTokenBalance(
    wallet?.getAccount()?.address,
    "0x" + wallet?.getChain()?.id?.toString(16),
    project?.tokenAddress
  );

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
      navigation("/takeover/burn/set_burn_thresholds");
    },
    onError: (error) => {
      toast.error("Joining project failed.");
    },
  });

  if (!projectId) {
    navigation("/takeover");
    return null;
  }
  if (isLoading || loading_token) return <LoadingSpinner />;
  if (loadingWide) return <LoadingPanel />;
  const handleJoinProject = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(
      project?.tokenAddress,
      erc20Abi,
      provider
    );
    const burningTokenAmount = Number(
      (percentage.toFixed(2) / 100) *
        formatBalance(tokens[0]?.balance, tokens[0]?.decimals)
    );
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
            project?.tokenAddress,
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
          project?.tokenAddress,
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
          wallets[0]?.getAccount().address
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
    <div
      className="flex items-center justify-center w-full pt-10 text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/admin_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {connectionStatus !== "connected" || wallets?.length === 0 ? (
        <TakeOverBurnChooseWallet />
      ) : null}
      <div className="mt-[80px] w-[80%] sm:w-[60%] md:mt-[124px] md:w-[56%] lg:w-[52%]">
        <Board>
          <div className="p-6">
            <div className="flex py-4">
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/burn.svg`}
                alt="Burn"
              />
              <span className="pl-4 text-[22px]">Start the burn pile</span>
            </div>

            <div className="cursor-pointer px-1.5 py-4 text-[16px]">
              <p>
                Use the slider below or click{" "}
                <span className="text-[#00FF91]">Enter exact amount</span> to
                decide how many tokens you want to commit to the burn pile to
                get your takeover started. Committed tokens cannot be recovered.
              </p>
            </div>
            {connectionStatus !== "connected" ||
            wallets?.length === 0 ? null : isLoading ||
              loading_token ||
              !tokens ? (
              <LoadingSpinner />
            ) : (
              <div className="flex flex-col px-1.5 py-[15px]">
                {!sliderOn ? (
                  <input
                    type="text"
                    className="my-[11px] h-[34px] rounded-[8px] border border-[#00ff8c] bg-[#000] bg-opacity-30 pl-3"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setPercentage(
                        (e.target.value * 100) / token?.total_supply_formatted
                      );
                    }}
                  />
                ) : (
                  <div className="my-[11px] h-[34px]">
                    <ProgressSlider
                      progressChanging={(v) => {
                        setPercentage(v);
                      }}
                      initialValue={percentage}
                    />
                  </div>
                )}
                <div className="flex justify-end">
                  <div className="flex flex-col">
                    {!sliderOn ? (
                      <div
                        className="mb-3 cursor-pointer"
                        onClick={() => {
                          setSliderOn(true);
                        }}
                      >
                        <span className="text-[12px] text-[#00ff91]">
                          <span className="border-b border-[#00ff91]">
                            Use percent slider
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div
                        className="mb-3 cursor-pointer"
                        onClick={() => {
                          setSliderOn(false);
                        }}
                      >
                        <span className="text-[12px] text-[#00ff91]">
                          <span className="border-b border-[#00ff91]">
                            Enter exact amount
                          </span>
                        </span>
                      </div>
                    )}
                    <div className="rounded-[8px] bg-[#000000] bg-opacity-30 px-4 py-2 text-[12px] md:w-[284px]">
                      <div className="flex justify-between py-[3px]">
                        <label className="text-[#56B0B9]">Wallet balance</label>
                        <span className="text-white">
                          {formatBalance(
                            tokens[0]?.balance,
                            tokens[0]?.decimals
                          )}{" "}
                          ${project?.tokenSymbol}
                        </span>
                      </div>
                      <div className="flex justify-between py-[3px]">
                        <label className="text-[#56B0B9]">% committed</label>
                        <span className="text-[#FF8A00]">
                          {percentage.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between py-[3px]">
                        <label className="text-[#56B0B9]">
                          Total committed
                        </label>
                        <span className="text-white">
                          {(percentage.toFixed(2) / 100) *
                            formatBalance(
                              tokens[0]?.balance,
                              tokens[0]?.decimals
                            )}{" "}
                          ${project?.tokenSymbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-auto">
              <div
                onClick={() => {
                  setCheckOn((state) => !state);
                }}
                className="flex cursor-pointer select-none items-center justify-between rounded-[8px] bg-[#000] bg-opacity-30 py-3 pl-3 pr-4"
              >
                <span className="text-[16px]">
                  I understand the tokens I commit to burn from this wallet
                  cannot be recovered.
                </span>

                {/* CheckBox show */}
                <div>
                  <span>
                    {!checkOn ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/check-off.svg`}
                        alt="checkoff"
                      />
                    ) : (
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/check-on.svg`}
                        alt="checkon"
                      />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  width="fit"
                  label="Next"
                  disabled={!checkOn}
                  onClick={() => {
                    if (checkOn) {
                      handleJoinProject();
                    }
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </Board>
      </div>
    </div>
  );
};

export default StartBurnPile;
