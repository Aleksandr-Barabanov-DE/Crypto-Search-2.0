import TopFiveAssets from "@/components/TopFiveAssets";
import { useState, useEffect } from "react";
import { fetchCryptoData } from "@/api/fetchCrypto";
import { Crypto } from "@/interfaces/interfaces";
import CryptoCard from "@/components/CryptoCard";
import CustomFilter from "@/components/CustomFilter";
import { useCrypto } from "@/api/CryptoContext";
import favourites from "@/assets/toFavorite.png";

export default function Favorites(): JSX.Element {
  const { isLocalStorageEnabled } = useCrypto();
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const savedFavorites = JSON.parse(localStorage.getItem("ids") || "[]");
  const sortedArr = cryptoData.filter((item) =>
    savedFavorites.includes(item.id)
  );

  const [sortCriterion, setSortCriterion] = useState<
    "price" | "marketCap" | "change" | "rank"
  >("price");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedCryptoData = [...sortedArr].sort((a, b) => {
    const criteriaMap = {
      price: parseFloat(a.priceUsd) - parseFloat(b.priceUsd),
      marketCap: parseFloat(a.marketCapUsd) - parseFloat(b.marketCapUsd),
      change: parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr),
      rank: parseInt(a.rank) - parseInt(b.rank),
    };

    const comparison = criteriaMap[sortCriterion];
    return sortDirection === "asc" ? comparison : -comparison;
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    getData();
  }, [isLocalStorageEnabled]);

  const filterOptions = [
    { value: "price", label: "Price" },
    { value: "marketCap", label: "Market Cap" },
    { value: "change", label: "24h Change" },
    { value: "rank", label: "Rank" },
  ];

  return (
    <div className="container">
      <TopFiveAssets />
      <div className="container__section-header">
        <h1>Favorites</h1>
        <img src={favourites} alt="Favorites Section Image" />
      </div>
      {savedFavorites.length > 0 && (
        <CustomFilter
          sortCriterion={sortCriterion}
          setSortCriterion={setSortCriterion}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          options={filterOptions}
        />
      )}
      <div className="top-cryptos-container">
        {error ? (
          <p>Error: {error}</p>
        ) : sortedCryptoData.length > 0 ? (
          sortedCryptoData.map((crypto) => (
            <div key={crypto.id} className="crypto-card">
              <CryptoCard crypto={crypto} />
            </div>
          ))
        ) : (
          <h3>Your list is currently empty. Please add cryptocurrencies.</h3>
        )}
      </div>
    </div>
  );
}
