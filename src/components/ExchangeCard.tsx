import React from "react";
import { ExchangeItemProps } from "@/interfaces/interfaces";
import "@/styles/exchangeCard.scss";
import linkIcon from "@/assets/linkIcon.png";

const ExchangeCard: React.FC<ExchangeItemProps> = ({ exchange }) => {
  return (
    <li className="exchange-card" key={exchange.exchangeId}>
      <h3>{exchange.name}</h3>
      <p>
        <strong>Rank:</strong> {exchange.rank}
      </p>
      <p>
        <strong>Trading Pairs:</strong> {exchange.tradingPairs}
      </p>
      <p>
        <strong>Volume (USD):</strong> $
        {parseFloat(exchange.volumeUsd).toLocaleString()}
      </p>
      <p>
        <strong>Percent Total Volume:</strong>{" "}
        {parseFloat(exchange.percentTotalVolume).toFixed(2)}%
      </p>
      <p>
        <strong>Updated:</strong> {new Date(exchange.updated).toLocaleString()}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href={exchange.exchangeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${exchange.name} exchange website`}
        >
          {exchange.exchangeUrl}
          <img src={linkIcon} alt={`Visit ${exchange.name} website`} />
        </a>
      </p>
    </li>
  );
};

export default ExchangeCard;
