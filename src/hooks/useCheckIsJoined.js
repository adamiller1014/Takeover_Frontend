import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCheckIsJoined = ({ memberAddress, projectId }) => {
  return useQuery({
    queryKey: ["Member", memberAddress, "projectId", projectId],
    queryFn: async () => {
      if (!memberAddress || !projectId) {
        return null;
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/checkisjoined`,
        {
          memberAddress,
          projectId,
        }
      );
      return data?.joined;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!memberAddress,
  });
};
