import React from "react";
import Board from "../../../../components/Board";
import WalletList from "./WalletList";
import { useProjectById } from "../../../../hooks/useProjectById";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";

const ProjectDetailConnectWallet = () => {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="flex w-full items-center justify-center py-6 text-red-500">
        {" "}
        Error loading project.
      </p>
    );
  return (
    <div className="flex w-11/12 flex-col gap-6 md:w-[60%]">
      <Board>
        <div className="p-6">
          <div className="flex py-4">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/choose_wallet.svg`}
              alt="choose_wallet"
            />
            <span className="pl-4 text-[22px]">Choose a wallet provider</span>
          </div>
          <WalletList selected_project={project} />
        </div>
      </Board>
    </div>
  );
};

export default ProjectDetailConnectWallet;
