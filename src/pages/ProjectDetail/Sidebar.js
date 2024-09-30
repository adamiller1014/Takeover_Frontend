import React, { useState, useEffect } from "react";
import { LoaderDots } from "@thumbtack/thumbprint-react";
import Board from "../../components/Board";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useTokenPriceInfoCoingecko } from "../../hooks/useTokenPriceInfoCoingecko";
import { useCheckIsJoined } from "../../hooks/useCheckIsJoined";
import {
  useActiveWalletConnectionStatus,
  useConnectedWallets,
} from "thirdweb/react";

const truncateAddress = (address, startChars = 10, endChars = 5) => {
  if (!address) return "";
  return `${address.slice(0, startChars)} ... ${address.slice(-endChars)}`;
};

const formatPriceNumber = (value) => {
  if (value === null || value === undefined) return "0";

  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + "K";
  }
  if (value < 1) {
    const valueStr = value.toString();
    const firstNonZero = valueStr.search(/[1-9]/);
    const significantDigits = Math.max(11 - firstNonZero, 4);
    return value.toFixed(significantDigits);
  }
  return value.toLocaleString();
};

const Sidebar = ({ selectedProject }) => {
  const { priceInfo, isLoading, isError, priceChangeIcon } =
    useTokenPriceInfoCoingecko(selectedProject.tokenAddress);

  const navigation = useNavigate();
  const wallets = useConnectedWallets();
  const isLoadingForConnecting =
    window.location.pathname.includes("/connect_wallet") ||
    window.location.pathname.includes("/dosent_have_token");
  const connectionStatus = useActiveWalletConnectionStatus();

  const { data: isJoined, refetch } = useCheckIsJoined({
    memberAddress:
      connectionStatus === "connected" && wallets.length > 0
        ? wallets[0].getAccount().address
        : null,
    projectId: selectedProject?._id,
  });
  useEffect(() => {
    refetch();
  }, [connectionStatus, wallets.length]);
  console.log(isJoined, "isJoinedisJoined", connectionStatus);

  if (isLoading)
    return (
      <div className="mb-6 flex w-11/12 flex-col gap-6 md:mb-0 md:w-[35%]">
        <Board className="flex flex-col items-center py-3 sm:py-5">
          <LoadingSpinner />
        </Board>
      </div>
    );
  // if (isError || !priceInfo) return <div>Error fetching data</div>;
  return (
    <div className="mb-6 flex w-11/12 flex-col gap-6 md:mb-0 md:w-[35%]">
      <Board className="flex flex-col items-center py-3 sm:py-5">
        <div className="flex w-full justify-start px-3 sm:px-5">
          <div className="flex w-40 items-center justify-start gap-1 rounded-full bg-gradient-to-r from-[#00FF8C6a] to-[#ffffff01] px-2 py-1">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/2568 members.svg`}
              alt="Main Token"
              className="h-5 w-4 rounded-full"
            />
            <span>
              {selectedProject.joinedMembers.length.toLocaleString()} members
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-4 p-4 sm:p-8 md:p-12">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/avatars/${selectedProject.avatar}`}
            className="h-60 w-60 rounded-full"
            alt="Selected Project Avatar"
          />
          <span className="text-2xl font-bold">
            {selectedProject.projectName}
          </span>
          <span className="h-auto w-full overflow-auto text-wrap text-sm">
            {selectedProject?.description}
          </span>
          <div className="flex w-full gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`}
              alt="X"
              className="h-6 w-6"
            />
            <span>
              <a
                href={selectedProject?.projectSocials?.twitter || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @
                {selectedProject?.projectSocials?.twitter?.split("/")?.pop() ||
                  ""}
              </a>
            </span>
          </div>
          <div className="flex w-full gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/telegram.svg`}
              alt="X"
              className="h-6 w-6"
            />
            <span>
              <a
                href={selectedProject?.projectSocials?.telegram || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {selectedProject?.projectSocials?.telegram?.split("/")?.pop() ||
                  ""}
              </a>
            </span>
          </div>
          <div className="flex w-full gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/Website.svg`}
              alt="X"
              className="h-6 w-6"
            />
            <span>
              <a
                href={selectedProject?.officialWebsite || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {selectedProject?.officialWebsite?.split("/")?.pop() || ""}
              </a>
            </span>
          </div>
          <Button
            width="full"
            isCapitalized={false}
            className={
              isJoined
                ? "bg-[#0D1F21] border-[#00FF91] border hover:opacity-100"
                : ""
            }
            text={isJoined ? "[#00FF91]" : undefined}
            onClick={() => {
              if (!isJoined && !isLoadingForConnecting) {
                navigation(`/details/${selectedProject._id}/connect_wallet`);
              }
            }}
            label={
              !isLoadingForConnecting ? (
                <span className="flex gap-3 uppercase">
                  <img
                    src={
                      isJoined
                        ? `${process.env.PUBLIC_URL}/assets/icons/Checked.svg`
                        : `${process.env.PUBLIC_URL}/assets/icons/solar_add-square-linear.svg`
                    }
                    alt="X"
                    className="h-6 w-6"
                  />
                  {isJoined
                    ? truncateAddress(selectedProject.tokenAddress)
                    : "Join Takeover"}
                </span>
              ) : (
                <span className="flex gap-3 p-2 uppercase">
                  <LoaderDots theme="muted" />
                </span>
              )
            }
          />
        </div>
      </Board>
      <Board className="flex flex-col justify-between p-4 md:px-6 lg:px-10">
        {isError ? (
          <span className="text-red-500">
            {isError?.response?.data?.message}
          </span>
        ) : null}
        <div className="flex flex-col items-center justify-between text-left sm:flex-row">
          <div className="flex flex-row justify-center gap-6 sm:flex-col sm:gap-2">
            <span className="text-xs text-[#56B0B9]">current price</span>
            {isError ? (
              "$"
            ) : (
              <>
                <span className="font-bold">
                  ${formatPriceNumber(priceInfo.usd)}
                </span>
                {priceChangeIcon ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/${priceChangeIcon}`}
                    alt="increase"
                  />
                ) : null}
              </>
            )}
          </div>
          <div className="flex flex-row justify-center gap-6 sm:flex-col sm:gap-2">
            <span className="text-xs text-[#56B0B9]">market cap</span>
            <span className="font-bold">
              ${isError ? "" : formatPriceNumber(priceInfo.usd_market_cap)}
            </span>
          </div>
          <div className="flex flex-row justify-center gap-6 sm:flex-col sm:gap-2">
            <span className="text-xs text-[#56B0B9]">24H volume</span>
            <span className="font-bold">
              ${isError ? "" : formatPriceNumber(priceInfo.usd_24h_vol)}
            </span>
          </div>
        </div>
      </Board>
    </div>
  );
};

export default Sidebar;
