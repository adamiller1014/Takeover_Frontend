import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCreateProjectMutation = () => {
  const navigation = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("projectName", data.projectName);
      formData.append("chainId", data.chainId);
      formData.append("tokenAddress", data.tokenAddress);
      formData.append("description", data.description);
      formData.append("interactionHashtag", data.interactionHashtag);
      formData.append("officialWebsite", data.officialWebsite);
      formData.append("owner", data.owner);
      formData.append("projectSocials[twitter]", data.projectSocials.twitter);
      formData.append("projectSocials[telegram]", data.projectSocials.telegram);
      formData.append("tokenSymbol", data.tokenSymbol);
      formData.append("uniqueCode", data.uniqueCode);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }
      if (data.socialImage) {
        formData.append("socialImage", data.socialImage);
      }

      const response = await axiosInstance.post(`/projects`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: async (data) => {
      console.log(data, "Project created successfully.");
      await localStorage.setItem("createdProjectId", data?.project?._id);
      navigation("/takeover/burn/start_burn_pile");
    },
    onError: (error) => {
      toast.error("Creating project failed.");
    },
  });
};

export default useCreateProjectMutation;
