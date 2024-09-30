import { useState, useEffect } from "react";
import axios from "axios";

export const useWalletOwnedAllTokens = (address = null, chain = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    if (!address || !chain) setData(null);
    else fetchTokenBalances();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chain]);

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
          },
        }
      );

      setData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, isLoading, isError };
};
