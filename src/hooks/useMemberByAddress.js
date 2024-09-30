import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMemberByAddress = ({ address }) => {
  return useQuery({
    queryKey: ["Member", address],
    queryFn: async () => {
      if (!address) {
        return null;
      }
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/members/address/${address}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!address,
  });
};
