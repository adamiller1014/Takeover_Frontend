import React, { useState } from "react";
import WalletList from "../ConnectWallet/WalletList";
import Board from "../../../../components/Board";
import Button from "../../../../components/Button";

const WalletPath = ({pagePath, setPagePath}) => {
  return (
    <Board>
      <div className="p-6">
        <div className="flex py-4">
          <img src={`${process.env.PUBLIC_URL}/assets/icons/choose_wallet.svg`} alt="choose_wallet" />
          <span className="pl-4 text-[22px]">Choose a wallet provider</span>
        </div>

        <div className="flex flex-col px-4 py-12 gap-12">
          <div className="flex flex-col gap-8">
            <span className="text-[32px] tracking-tighter leading-none">NOT PART OF DESIGN: User will select a wallet in the wallet connection window of their choice.</span>
            <span className="text-[32px] tracking-tighter leading-none">Either the wallet will or will not have the current token in it. Choose which result to view below.</span>
          </div>
          <div className="flex gap-6">
            <Button label="Wallet has token" width="fit" onClick={() => {
              setPagePath('burn_baby_burn');
            }} />
            <Button label="Wallet does not have token" width="fit" disabled={true} onClick={() => {
              setPagePath('doesnottoken');
            }}/>
          </div>
        </div>

      </div>
    </Board>

  )
}

export default WalletPath;