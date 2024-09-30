import { useState, useEffect } from "react";
import axios from "axios";

export const useWalletTokenBalance = (
  address = null,
  chain = null,
  token_address = null
) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    if (!address || !chain || !token_address) {
      setData(null);
      setLoading(false);
    } else fetchTokenBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chain, token_address]);
  const fetchTokenBalances = async () => {
    try {
      const response = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/${address}/erc20`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
          },
          params: {
            chain,
            token_addresses: [token_address],
          },
        }
      );

      setData(response.data);
    } catch (e) {
      console.log(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, isLoading, isError };
};
