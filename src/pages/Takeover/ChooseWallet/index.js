import React, { useEffect, useState } from "react";
import Board from "../../../components/Board";
import WalletList from "./WalletList";

const TakeoverChooseWallet = () => {
  const [selectWalletIndex, setSelectWalletIndex] = useState(0);

  useEffect(() => {
    if (window.opener) {
      // Optionally close the current window after redirection
      window.close();
    }
  },[])

  return (
    <div
      className="flex h-[calc(100vh-110px)] w-full items-center justify-center pt-10 text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/admin_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Board className="mt-[50px] h-[calc(100vh-200px)] w-[76%] overflow-auto sm:w-[60%] md:w-[56%] lg:w-[52%]">
        <div className="p-6">
          <div className="flex py-4">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/choose_wallet.svg`}
              alt="choose_wallet"
            />
            <span className="pl-4 text-[22px]">Choose a wallet provider</span>
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

export default TakeoverChooseWallet;
