import React, { useState } from "react";
import ChooseWallet from "./ChooseWallet";
import WalletPath from "./WalletPath";
import DoesNotToken from "./DoesNotToken";
import BurnBabyBurn from "./BurnBabyBurn";
import HasToken from "./HasToken";

const ConnectWallet = () => {
  const [pagePath, setPagePath] = useState('choosewallet');
  
  switch (pagePath) {
    case 'choosewallet':
      return (
        <ChooseWallet pagePath={pagePath} setPagePath={setPagePath} />
      )
    case 'walletpath':
      return (
        <WalletPath pagePath={pagePath} setPagePath={setPagePath} />
      )
    case 'doesnottoken': 
      return (
        <DoesNotToken pagePath={pagePath} setPagePath={setPagePath} />
      )
    case 'burn_baby_burn':
      return (
        <BurnBabyBurn pagePath={pagePath} setPagePath={setPagePath} />
      )
    case 'hastoken':
      return (
        <HasToken pagePath={pagePath} setPagePath={setPagePath} />
      )
    default:
      break;
  }
}

export default ConnectWallet;