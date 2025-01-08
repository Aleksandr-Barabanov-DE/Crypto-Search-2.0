import { useEffect, useState, useMemo } from "react";
import { fetchCryptoData } from "@/api/fetchCrypto";
import { Crypto } from "@/interfaces/interfaces";
import "@/styles/topFiveAssets.scss";
import "@/styles/top100Page.scss";
import TopFiveAssets from "@/components/TopFiveAssets";
import CryptoCard from "@/components/CryptoCard";
import CustomFilter from "@/components/CustomFilter";
import { useCrypto } from "@/api/CryptoContext";
import top100Image from "@/assets/top100.png";

export default function CryptoPrices() {
  const { isLocalStorageEnabled } = useCrypto();
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortCriterion, setSortCriterion] = useState<
    "price" | "marketCap" | "change" | "rank"
  >("change");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedCryptoData = useMemo(() => {
    return [...cryptoData].sort((a, b) => {
      const criteriaMap = {
        price: parseFloat(a.priceUsd) - parseFloat(b.priceUsd),
        marketCap: parseFloat(a.marketCapUsd) - parseFloat(b.marketCapUsd),
        change:
          parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr),
        rank: parseInt(a.rank) - parseInt(b.rank),
      };

      const comparison = criteriaMap[sortCriterion];
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [cryptoData, sortCriterion, sortDirection]);

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
        <h1>Top 100 Cryptos</h1>
        <img src={top100Image} alt="Top 100 Section Image" />
      </div>
      <CustomFilter
        sortCriterion={sortCriterion}
        setSortCriterion={setSortCriterion}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        options={filterOptions}
      />

      <div className="top-cryptos-container">
        {error ? (
          <p>Error: {error}</p>
        ) : sortedCryptoData.length > 0 ? (
          sortedCryptoData.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))
        ) : (
          <p>No data to display. Check your connection.</p>
        )}
      </div>
    </div>
  );
}
