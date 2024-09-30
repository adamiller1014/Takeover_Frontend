import React from "react";
import { WalletOptions } from "../../../wallet-option";

function ConnectWallet() {
  return (
    <div className="flex flex-wrap justify-center gap-7 px-4 py-12">
      <WalletOptions nextUrl="/takeover/select_token" />
    </div>
  );
}

export default ConnectWallet;
