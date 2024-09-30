import React from "react";
import TokensBurned from "./TokensBurned";
import SocialActions from "./SocialActions";
import TransactionTable from "./TransactionTable";
import BurntTokenChart from "../../../components/BurntTokenChart";
import { useParams } from "react-router-dom";
import { useProjectById } from "../../../hooks/useProjectById";


const ProjectDetailContent = () => {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });

  return (<div className="md:w-[60%] w-11/12 flex flex-col gap-6">
    <TokensBurned />
    <SocialActions project={project} />
    <BurntTokenChart />
    <TransactionTable />
  </div>
  )
}

export default ProjectDetailContent