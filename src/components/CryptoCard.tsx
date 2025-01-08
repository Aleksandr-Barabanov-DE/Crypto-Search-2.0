import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import isPositiveIcon from "@/assets/trend-up.png";
import isNegativeIcon from "@/assets/trend-down.png";
import bearish from "@/assets/bearish.png";
import bullish from "@/assets/bullish.png";
import addToFav from "@/assets/addToFav.png";
import removeFromFav from "@/assets/removeFromFav.png";
import { CryptoCardProps } from "@/interfaces/interfaces";
import "@/styles/cryptoCard.scss";
import { useCrypto } from "@/api/CryptoContext";

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const { setLocalStorageEnabled } = useCrypto();
  const changePercent = parseFloat(crypto.changePercent24Hr || "0");
  const isPositive = changePercent > 0;

  const bullishTrend = changePercent > 3;
  const bearishTrend = changePercent < -10;

  const topPage = useMatch("/Top100");
  const favPage = useMatch("/Favorites");
  const searchPage = useMatch("/Search");

  const [isFavorite, setIsFavorite] = useState(false);

  const getFavorites = (): string[] =>
    JSON.parse(localStorage.getItem("ids") || "[]");

  const setFavorites = (favorites: string[]) =>
    localStorage.setItem("ids", JSON.stringify(favorites));

  useEffect(() => {
    const savedFavorites = getFavorites();
    setIsFavorite(savedFavorites.includes(crypto.id));
  }, [crypto.id]);

  const setItemToFavorite = () => {
    const savedFavorites = getFavorites();
    if (!savedFavorites.includes(crypto.id)) {
      setFavorites([...savedFavorites, crypto.id]);
      setIsFavorite(true);
      setLocalStorageEnabled((prev) => !prev);
    }
  };

  const removeItemFromFavorites = () => {
    const savedFavorites = getFavorites();
    const newFavorites = savedFavorites.filter((item) => item !== crypto.id);
    setFavorites(newFavorites);
    setIsFavorite(false);
    setLocalStorageEnabled((prev) => !prev);
  };

  const trendClass = bullishTrend
    ? "bullish-trend"
    : bearishTrend
      ? "bearish-trend"
      : "";
  const directionClass = isPositive ? "going-up" : "going-down";
  const showAddButton = (searchPage || topPage) && !isFavorite;
  const showRemoveButton = favPage && isFavorite;

  return (
    <div
      className={`crypto-item ${trendClass} ${directionClass}`}
      id={crypto.id}
    >
      <div className="crypto-item__heading">
        <h3>
          {crypto.name} ({crypto.symbol})
        </h3>
        {showAddButton && (
          <button
            onClick={setItemToFavorite}
            className="tooltip-btn"
            aria-label="Add to Favorites"
          >
            <img src={addToFav} alt="Add to favorites" />
            <span className="tooltip-text">Add to Favorites</span>
          </button>
        )}
        {showRemoveButton && (
          <button
            onClick={removeItemFromFavorites}
            className="tooltip-btn"
            aria-label="Remove from Favorites"
          >
            <img src={removeFromFav} alt="Remove from favorites" />
            <span className="tooltip-text">Remove from Favorites</span>
          </button>
        )}
      </div>
      <p>
        Price: $
        {Number(crypto.priceUsd) < 1
          ? Number(crypto.priceUsd)
            .toPrecision(2)
            .replace(/\.?0+$/, "")
          : Number(crypto.priceUsd).toFixed(2)}
      </p>
      <p>Market Cap: ${Number(crypto.marketCapUsd).toLocaleString()}</p>
      <p>
        24h Change: {changePercent.toFixed(2)}%
        <img
          className="top-five-trend-icon"
          src={isPositive ? isPositiveIcon : isNegativeIcon}
          alt="Current trend"
        />
      </p>
      <p>Volume (24h): ${Number(crypto.volumeUsd24Hr).toLocaleString()}</p>
      <p>
        Supply: {Number(crypto.supply).toLocaleString()} {crypto.symbol}
      </p>
      <p>
        Max Supply:{" "}
        {crypto.maxSupply ? Number(crypto.maxSupply).toLocaleString() : "N/A"}
      </p>
      <p>Rank: {crypto.rank}</p>
      {bullishTrend && (
        <img className="trend-image" src={bullish} alt="Bullish Trend" />
      )}
      {bearishTrend && (
        <img className="trend-image" src={bearish} alt="Bearish Trend" />
      )}
    </div>
  );
};

export default CryptoCard;
