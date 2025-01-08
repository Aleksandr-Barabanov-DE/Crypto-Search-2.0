import { useLayoutEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { useCrypto } from "@/api/CryptoContext";
import "@/styles/topFiveAssets.scss";
import isPositiveIcon from "@/assets/trend-up.png";
import isNegativeIcon from "@/assets/trend-down.png";

export default function TopFiveAssets() {
  const { cryptoData, loading, error } = useCrypto();
  const listRef = useRef<HTMLUListElement>(null);

  const sortedCrypto = useMemo(() => {
    return cryptoData
      ? [...cryptoData].sort(
        (a, b) => parseFloat(b.volumeUsd24Hr) - parseFloat(a.volumeUsd24Hr)
      )
      : [];
  }, [cryptoData]);

  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (listRef.current && !hasAnimated) {
      const items = listRef.current.children;
      gsap.fromTo(
        items,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
      setHasAnimated(true);
    }
  }, [sortedCrypto, hasAnimated]);

  if (loading)
    return (
      <div className="top-five-container">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="top-five-container">
        <p className="error-message">Error: {error}</p>
      </div>
    );

  return (
    <div className="top-five-container">
      <h4>Top 5 (24h):</h4>
      <ul className="top-five-list" ref={listRef}>
        {sortedCrypto.slice(0, 5).map((crypto) => {
          const changePercent = parseFloat(crypto.changePercent24Hr);
          const isPositive = changePercent > 0;
          const price = parseFloat(crypto.priceUsd).toFixed(2);

          return (
            <li key={crypto.id} className="top-five-item">
              <h4>
                {crypto.name} ({crypto.symbol})
              </h4>
              <p>Price: ${price}</p>
              <img
                className="top-five-trend-icon"
                src={isPositive ? isPositiveIcon : isNegativeIcon}
                alt={isPositive ? "Positive trend" : "Negative trend"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
