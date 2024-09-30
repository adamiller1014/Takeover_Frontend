import { useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import { useProjectById } from "../../../../hooks/useProjectById";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";

const statuses = {
  pending: { title: "Unapproved", action: "active" },
  active: { title: "Approved - Not live", action: "inactive" },
  inactive: { title: "Suspended", action: "active" },
};
const ProjectStatus = () => {
  // 0: active, 1: pending, 2: inactive
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
    refetch,
  } = useProjectById({ _id: projectId });

  const UpdateMutation = useMutation({
    mutationFn: async ({ status }) => {
      const response = await axiosInstance.put(`/projects/${projectId}`, {
        ...project,
        status,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Updated Status Successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error("Update failed.");
    },
  });
  if (isLoading || !project) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="flex w-full items-center justify-center py-6 text-red-500">
        {" "}
        Error loading project.
      </p>
    );
  const { status } = project;

  return (
    <div
      className={`flex flex-col bg-opacity-30 backdrop-blur-md rounded-2xl p-6 gap-4 ${
        status === "active" ? "bg-[#00FF8C]" : "bg-[#FF6464]"
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/lock.svg`}
          alt="fire"
          className="h-9 w-9"
        />
        <span className="text-[22px] font-bold">Project backend status</span>
      </div>
      <span className="text-2xl">
        Current status:{" "}
        <span className="font-bold">{statuses[status].title}</span>
      </span>
      <Button
        label={`${statuses[status].action} project`}
        width="fit"
        onClick={() => {
          UpdateMutation.mutate({
            status: statuses[status].action,
          });
        }}
      />
    </div>
  );
};

export default ProjectStatus;
