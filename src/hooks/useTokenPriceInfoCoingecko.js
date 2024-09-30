import { useState, useEffect } from "react";
import axios from "axios";

export const useTokenPriceInfoCoingecko = (
  tokenAddress,
  vsCurrency = "usd"
) => {
  const [priceInfo, setPriceInfo] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);
  const [priceChangeIcon, setPriceChangeIcon] = useState("");
  const [previousPrice, setPreviousPrice] = useState(null);

  useEffect(() => {
    if (!tokenAddress) {
      setError("Invalid token address");
      setLoading(false);
      return;
    }

    const fetchTokenPriceInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_COINGECKO_API_URL}/api/v3/simple/token_price/ethereum`,
          {
            headers: {
              accept: "application/json",
              [process.env.REACT_APP_COINGECKO_API_HEADER]:
                process.env.REACT_APP_COINGECKO_API_KEY,
            },
            params: {
              contract_addresses: tokenAddress,
              vs_currencies: vsCurrency,
              include_market_cap: true,
              include_24hr_vol: true,
              include_24hr_change: true,
              include_last_updated_at: true,
            },
          }
        );
        const lowerCaseAddress = tokenAddress.toLowerCase();
        const tokenData = response.data[lowerCaseAddress];

        if (tokenData) {
          const currentPrice = tokenData[vsCurrency];

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
          setPriceInfo(tokenData);
          setError(null);
        } else {
          setPriceInfo(null);
          setError("Token data not found");
        }
      } catch (e) {
        console.log(e);
        setPriceInfo(null);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenPriceInfo();
  }, [tokenAddress, vsCurrency, previousPrice]);

  return { priceInfo, isLoading, isError, priceChangeIcon };
};
