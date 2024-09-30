import React, { useEffect, useState } from "react";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import TokenList from "./TokenList";
import { useNavigate } from "react-router-dom";
import { useWalletOwnedAllTokens } from "../../../hooks/useWalletOwnedAllTokens";
import useStore from "../../../store/useStore";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import {
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useConnectedWallets,
  useDisconnect,
} from "thirdweb/react";

const SelectToken = () => {
  const navigation = useNavigate();
  const [checkOn, setCheckOn] = useState(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(null);
  const connectionStatus = useActiveWalletConnectionStatus();
  const wallets = useConnectedWallets();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const updateProjectInfoField = useStore(
    (state) => state.updateProjectInfoField
  );

  useEffect(() => {
    if (connectionStatus !== "connected" || wallets.length === 0)
      navigation("/takeover");
  }, [connectionStatus, navigation, wallets]);
  const {
    data: tokens,
    isLoading,
    isError,
  } = useWalletOwnedAllTokens(
    connectionStatus === "connected" && wallets.length > 0
      ? wallets[0].getAccount().address
      : null,
    connectionStatus === "connected" && wallets.length > 0
      ? "0x" + wallets[0].getChain().id?.toString(16)
      : null
  );
  useEffect(() => {
    if (selectedTokenIndex !== null) {
      updateProjectInfoField(
        "tokenAddress",
        tokens[selectedTokenIndex].token_address
      );
      updateProjectInfoField(
        "tokenDecimals",
        tokens[selectedTokenIndex].decimals
      );
      updateProjectInfoField("tokenSymbol", tokens[selectedTokenIndex].symbol);
    }
  }, [selectedTokenIndex, tokens, updateProjectInfoField]);

  if (isError) return <p>Error loading tokens.</p>;

  return (
    <div
      className="flex w-full items-center justify-center pt-10 text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/admin_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Board className="mt-[50px] h-[calc(100vh-200px)] w-[76%] overflow-auto sm:w-[60%] md:w-[56%] lg:w-[52%]">
        <div className="flex h-full flex-col justify-between p-6">
          <div className="flex flex-col justify-between">
            <div className="flex py-4">
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/select_project.svg`}
                alt="select_token"
              />
              <span className="pl-4 text-[22px]">Select a Token you own</span>
            </div>
            {isLoading || tokens === null ? (
              <LoadingSpinner />
            ) : tokens?.length === 0 ? (
              <div className="flex flex-col items-center">
                <div className="mb-2 mt-3 flex flex-col rounded-lg bg-[#F83737] bg-opacity-[32%] p-4 text-center">
                  <span className="text-[18px] leading-8 tracking-tighter text-[#FFD3D3]">
                    You don't have any tokens at this wallet.
                  </span>
                  <span className="text-[18px] leading-8 tracking-tighter text-[#FFD3D3]">
                    Please choose another wallet.
                  </span>
                </div>
                <Button
                  label="Try another wallet"
                  width="fit"
                  onClick={async () => {
                    await disconnect(wallet);
                    navigation(`/takeover`);
                  }}
                />
              </div>
            ) : (
              <TokenList
                selectedTokenIndex={selectedTokenIndex}
                setSelectedTokenIndex={setSelectedTokenIndex}
                tokens={tokens}
              />
            )}
          </div>
          {isLoading || tokens === null ? null : tokens?.length === 0 ? null : (
            <div>
              <div
                className="flex cursor-pointer justify-between rounded-[8px] bg-[#000] bg-opacity-30 py-3 pl-3 pr-4"
                onClick={() => {
                  setCheckOn(!checkOn);
                }}
              >
                <span className="select-none text-[16px]">
                  I certify that I am one of the principal owners of the above
                  selected token
                </span>

                {/* CheckBox show */}
                {!checkOn ? (
                  <div>
                    <span>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/check-off.svg`}
                        alt="checkoff"
                      />
                    </span>
                  </div>
                ) : (
                  <div>
                    <span>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/check-on.svg`}
                        alt="checkon"
                      />
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  width="fit"
                  label="Next"
                  disabled={!checkOn || selectedTokenIndex === null}
                  onClick={() => {
                    if (checkOn && selectedTokenIndex !== null)
                      navigation("/takeover/set_project");
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Board>
    </div>
  );
};

export default SelectToken;
