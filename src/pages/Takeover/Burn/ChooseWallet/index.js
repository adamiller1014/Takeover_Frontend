import React, { useEffect, useState } from "react";
import Board from "../../../../components/Board";
import WalletList from "./WalletList";

const TakeOverBurnChooseWallet = () => {
  const [selectWalletIndex, setSelectWalletIndex] = useState(0);

  useEffect(() => {
    if (window.opener) {
      // Optionally close the current window after redirection
      window.close();
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen py-6 overflow-hidden backdrop-blur-lg">
      <Board className="absolute z-50 top-1/2 left-1/2 overflow-y-auto -translate-y-1/2 -translate-x-1/2 h-[calc(100vh-200px)] w-[76%] overflow-auto sm:w-[60%] md:w-[56%] lg:w-[52%]">
        <div className="p-6">
          <div className="flex py-4">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/choose_wallet.svg`}
              alt="choose_wallet"
            />
            <span className="pl-4 text-[22px]">Connect Wallet First!</span>
          </div>
          <WalletList
            selectWalletIndex={selectWalletIndex}
            setSelectWalletIndex={setSelectWalletIndex}
          />
        </div>
      </Board>
    </div>
  );
};

export default TakeOverBurnChooseWallet;
