import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProjectById = ({ _id }) => {
  return useQuery({
    queryKey: ["project", _id],
    queryFn: async () => {
      if (!_id) {
        throw new Error("Project ID is required");
      }

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/${_id}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!_id,
  });
};
