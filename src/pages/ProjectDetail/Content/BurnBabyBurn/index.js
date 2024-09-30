import React, { useState, useEffect } from "react";
import Board from "../../../../components/Board";
import Button from "../../../../components/Button";
import ProgressSlider from "../../../../components/ProgressSlider";
import ProgressBarTwoColor from "../../../../components/ProgressBarTwoColor";
import { useNavigate, useParams } from "react-router-dom";
import {
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useConnectedWallets,
  // useWalletBalance,
} from "thirdweb/react";
import { useProjectById } from "../../../../hooks/useProjectById";
import { useWalletTokenBalance } from "../../../../hooks/useWalletTokenBalance";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";
import BigNumber from "bignumber.js";
import useStore from "../../../../store/useStore";

export const formatBalance = (balance, decimals) => {
  const balanceBN = new BigNumber(balance);
  const decimalDivisor = new BigNumber(10).pow(decimals);
  const formattedBalance = balanceBN.div(decimalDivisor).toFixed(2);
  return formattedBalance;
};
const BurnBabyBurn = () => {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });
  const navigation = useNavigate();
  const connectionStatus = useActiveWalletConnectionStatus();
  const wallets = useConnectedWallets();
  const wallet = useActiveWallet();
  const { data: tokens, isLoading: loading_token } = useWalletTokenBalance(
    wallet?.getAccount()?.address,
    "0x" + wallet?.getChain()?.id?.toString(16),
    project.tokenAddress
  );
  const [checkOn, setCheckOn] = useState(false);
  const [sliderOn, setSliderOn] = useState(true);
  const [amount, setAmount] = useState(20000);
  const [percentage, setPercentage] = useState(5);
  useEffect(() => {
    if (connectionStatus !== "connected" || wallets?.length === 0)
      navigation(`/details/${projectId}/connect_wallet`);
  }, [connectionStatus, navigation, projectId, wallets]);

  return (
    <div className="flex w-11/12 flex-col gap-6 md:w-[60%]">
      <Board>
        {isLoading || loading_token ? (
          <LoadingSpinner />
        ) : (
          <div className="p-6">
            <div className="flex py-4">
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/solar_fire-bold.svg`}
                alt="solar_fire-bold"
              />
              <span className="pl-4 text-[22px] font-bold">
                Burn baby burn!
              </span>
            </div>

            <div className="px-4 py-2">
              <div className="flex flex-col gap-3 rounded-[8px] bg-[#000000] bg-opacity-30 px-4 py-2">
                <span className="text-[16px] leading-6">
                  Burn pile breakdown
                </span>
                <ProgressBarTwoColor
                  percentage={(1500000 / (1500000 + 505050)) * 100}
                  doneColor="#00FF8C"
                  remainColor="#FF8A00"
                  thickness="10px"
                />
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm leading-6 text-[#00FF8C]">
                      1500000 ${project?.tokenSymbol}
                    </span>
                    <span className="text-xs text-[#56B0B9]">
                      contributed by 3 developer wallets
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-right text-sm leading-6 text-[#FF8A00]">
                      505050 ${project?.tokenSymbol}
                    </span>
                    <span className="text-xs text-[#56B0B9]">
                      contributed by 120 community wallets
                    </span>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer px-1.5 py-4 text-[16px]">
                <p className="leading-6 tracking-tighter">
                  Boost <b>{project?.tokenSymbol} Daddy</b> by adding some of
                  your own tokens to the burn pile. Use the slider to choose the
                  percentage of your tokens to commit to burn or click enter
                  exact amount.{" "}
                  <b>
                    This step is optional but encouraged for community wallets.
                  </b>
                </p>
              </div>

              <div className="flex flex-col px-1.5 py-2">
                {!sliderOn ? (
                  <input
                    type="text"
                    className="my-[11px] h-[34px] rounded-[8px] border border-[#00ff8c] bg-[#000] bg-opacity-30 pl-3"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
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
                    <div className="mb-4 rounded-[8px] bg-[#000000] bg-opacity-30 px-4 py-2 text-[12px] md:w-[284px]">
                      <div className="flex justify-between py-[3px]">
                        <label className="text-[#56B0B9]">Wallet balance</label>
                        <span className="text-white">
                          {formatBalance(tokens[0].balance, tokens[0].decimals)}{" "}
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
                              tokens[0].balance,
                              tokens[0].decimals
                            )}{" "}
                          ${project?.tokenSymbol}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <Button
                        label="Next"
                        onClick={() => {
                          localStorage.setItem(
                            "burningTokenAmount",
                            Number(
                              (percentage.toFixed(2) / 100) *
                                formatBalance(
                                  tokens[0].balance,
                                  tokens[0].decimals
                                )
                            )
                          );
                          navigation(`/details/${projectId}/burn_confirm`);
                        }}
                      />
                      <span
                        className="py-[9px] text-center text-[12px] text-[#00ff91]"
                        onClick={() => {
                          navigation(`/details/${projectId}`);
                        }}
                      >
                        <span className="cursor-pointer border-b border-[#00ff91] text-sm leading-6">
                          Skip this step for now
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Board>
      {isLoading || loading_token ? null : (
        <Board>
          <div className="flex justify-between px-6 py-3">
            <span className="text-[16px] leading-6 tracking-tighter text-[#56B0B9]">
              Check this box if this wallet belongs to a team member or project
              owner
            </span>

            {/* CheckBox show */}
            {!checkOn ? (
              <div
                onClick={() => {
                  setCheckOn(true);
                }}
              >
                <span>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/check-off.svg`}
                    alt="checkoff"
                  />
                </span>
              </div>
            ) : (
              <div
                onClick={() => {
                  setCheckOn(false);
                }}
              >
                <span>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/check-on.svg`}
                    alt="checkon"
                  />
                </span>
              </div>
            )}
          </div>
        </Board>
      )}
    </div>
  );
};

export default BurnBabyBurn;
