import React from "react";
import TokensBurned from "./TokensBurned";
import SocialActions from "./SocialActions";
import TransactionTable from "./TransactionTable";
import ProjectStatus from "./ProjectStatus";

const ProjectDetailContent = () => {
  return (
    <div className="flex w-11/12 flex-col gap-6 md:w-[60%]">
      <ProjectStatus />
      <TokensBurned />
      <SocialActions />
      <TransactionTable />
    </div>
  );
};

export default ProjectDetailContent;
