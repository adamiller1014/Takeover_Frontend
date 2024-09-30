import { useState, useEffect } from "react";
import axios from "axios";

export const useTokenPriceInfo = (tokenAddress, chain) => {
  const [priceInfo, setPriceInfo] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);
  const [priceChangeIcon, setPriceChangeIcon] = useState("");
  const [previousPrice, setPreviousPrice] = useState(null);

  useEffect(() => {
    if (!tokenAddress || !chain) {
      setError("Invalid token address or chain");
      setLoading(false);
      return;
    }

    const fetchTokenPriceInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/price`,
          {
            headers: {
              accept: "application/json",
              "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
            },
            params: {
              chain,
              include: "percent_change",
            },
          }
        );

        const currentPrice = response.data?.usdPrice;

        if (previousPrice !== null) {
          if (currentPrice > previousPrice) {
            setPriceChangeIcon("increase.svg");
          } else if (currentPrice < previousPrice) {
            setPriceChangeIcon("decrease.svg");
          } else {
            setPriceChangeIcon(null);
          }
        }

        setPreviousPrice(currentPrice);
        setPriceInfo(response.data);
        setError(null);
      } catch (e) {
        console.log(e);
        setPriceInfo(null);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenPriceInfo();
  }, [tokenAddress, chain, previousPrice]);

  return { priceInfo, isLoading, isError, priceChangeIcon };
};
