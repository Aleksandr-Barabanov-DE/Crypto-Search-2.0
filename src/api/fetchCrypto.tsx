
export const fetchCryptoData = async () => {
  const assetsUrl = "https://api.coincap.io/v2/assets";
  try {
    const response = await fetch(assetsUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Crypto:", error);
    throw error;
  }
};


export const fetchExchangesData = async () => {
  const exchangesUrl = "https://api.coincap.io/v2/exchanges";
  try {
    const response = await fetch(exchangesUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const exchangesData = await response.json();
    return exchangesData.data;
  }
  catch (error) {
    console.error("Error fetching Exchanges:", error);
    throw error;
  }
}

export const fetchMarketsData = async () => {
  const marketsUrl = "https://api.coincap.io/v2/markets";
  try {
    const response = await fetch(marketsUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const marketsData = await response.json();
    return marketsData.data;
  }
  catch (error) {
    console.error("Error fetching Markets:", error);
    throw error;
  }
}