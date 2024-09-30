import * as React from "react";
import wallets_list from "./Wallets.json";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useMemberByAddress } from "./hooks/useMemberByAddress";
import axiosInstance from "./utils/axiosInstance";
import { toast } from "react-toastify";
import useStore from "./store/useStore";
import {
  ConnectButton,
  useActiveWalletConnectionStatus,
  useConnectedWallets,
} from "thirdweb/react";
import { client } from "./third_web_config";
import { createWallet } from "thirdweb/wallets";

export function WalletOptions({ nextUrl = null }) {
  const updateProjectInfoField = useStore(
    (state) => state.updateProjectInfoField
  );
  const editedProjectInfo = useStore((state) => state.editedProjectInfo);

  const wallets = useConnectedWallets();
  const connectionStatus = useActiveWalletConnectionStatus();
  const navigate = useNavigate();

  const { data: member } = useMemberByAddress({
    address:
      connectionStatus === "connected" && wallets.length > 0
        ? wallets[0].getAccount().address
        : null,
  });

  const CreateMemberMutation = useMutation({
    mutationFn: async ({ address }) => {
      const response = await axiosInstance.post(`/members`, {
        address: address,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // merge and remove duplicate member
      const joinedMembers = new Set([
        ...editedProjectInfo.joinedMembers,
        data.member._id,
      ]);
      updateProjectInfoField("owner", data.member._id);
      updateProjectInfoField("joinedMembers", Array.from(joinedMembers));
      updateProjectInfoField("chainId", wallets[0].getChain().id);
      console.log("onSuccss Creat member", nextUrl);
      if (nextUrl) navigate(nextUrl);
    },
    onError: (error) => {
      toast.error("Creating failed.");
    },
  });

  React.useEffect(() => {
    if (connectionStatus === "connected" && wallets.length > 0) {
      if (member && member.members !== undefined) {
        if (member.members.length === 0) {
          CreateMemberMutation.mutate({
            address: wallets[0].getAccount().address,
          });
        } else {
          const joinedMembers = new Set([
            ...editedProjectInfo.joinedMembers,
            member.members[0]._id,
          ]);

          updateProjectInfoField("owner", member.members[0]._id);
          updateProjectInfoField("chainId", wallets[0].getChain().id);
          updateProjectInfoField("joinedMembers", Array.from(joinedMembers));
          if (nextUrl) navigate(nextUrl);
        }
      } else {
        CreateMemberMutation.mutate({
          address: wallets[0].getAccount().address,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus, wallets, member]);

  return wallets_list.map((wallet) => (
    <ConnectButton
      key={wallet.id}
      client={client}
      connectButton={{
        label: (
          <div
            key={wallet.id}
            className="flex w-full cursor-pointer items-center justify-between rounded-[8px] bg-opacity-10 px-3 py-1.5 text-white hover:bg-opacity-20"
          >
            <span>{wallet.name}</span>
            <div className="flex gap-5">
              <img
                className="rounded"
                src={`${process.env.PUBLIC_URL}${wallet.icon}`}
                alt={`${wallet.name}`}
              />
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/arrow-right.svg`}
                alt="arrow-right"
              />
            </div>
          </div>
        ),
        style: {
          width: "45%",
          cursor: "pointer",
          padding: 0,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      detailsButton={{
        render: () => (
          <div
            key={wallet.id}
            className="flex w-full cursor-pointer items-center justify-between rounded-[8px] bg-opacity-10 px-3 py-1.5 text-white hover:bg-opacity-20"
          >
            <span>{wallet.name}</span>
            <div className="flex gap-5">
              <img
                className="rounded"
                src={`${process.env.PUBLIC_URL}${wallet.icon}`}
                alt={`${wallet.name}`}
              />
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/arrow-right.svg`}
                alt="arrow-right"
              />
            </div>
          </div>
        ),
        style: {
          width: "45%",
          cursor: "pointer",
          padding: 0,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      wallets={[createWallet(wallet.id)]}
    />
  ));
}
