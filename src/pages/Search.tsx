import { useState } from "react";
import TopFiveAssets from "@/components/TopFiveAssets";
import MultipleSelectCheckmarks from "@/components/CryptoSelect";
import { Crypto, Exchange } from "@/interfaces/interfaces";
import "chartjs-adapter-date-fns";
import "@/styles/searchPage.scss";
import CryptoCard from "@/components/CryptoCard";
import searchImg from "@/assets/search.png";
import ExchangeSelect from "@/components/ExchangesSelect"; // Импорт компонента
import ExchangeCard from "@/components/ExchangeCard";

export default function Search(): JSX.Element {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [recievedData, setRecievedData] = useState<Crypto[]>([]);

  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([]); // Состояние для выбранных обменников
  const [exchangeData, setExchangeData] = useState<Exchange[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [isCryptoSearch, setIsCryptoSearch] = useState<boolean>(false);
  const [isExchangeSearch, setIsExchangeSearch] = useState<boolean>(false);

  return (
    <div className="container">
      <TopFiveAssets />
      <div className="container__section-header">
        <h1>Search</h1>
        <img src={searchImg} alt="Search Section Image" />
      </div>
      <div className="container__selector-section">
        <MultipleSelectCheckmarks
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          recievedData={recievedData}
          setRecievedData={setRecievedData}
          isSearched={isSearched}
          setIsSearched={setIsSearched}
          setIsCryptoSearch={setIsCryptoSearch}
          setIsExchangeSearch={setIsExchangeSearch}
        />
        <ExchangeSelect
          selectedExchanges={selectedExchanges}
          setSelectedExchanges={setSelectedExchanges}
          setExchangeData={setExchangeData}
          setIsExchangeSearch={setIsExchangeSearch}
          setIsCryptoSearch={setIsCryptoSearch}
        />
      </div>
      {isCryptoSearch && (
        <div className="crypto-data">
          <ul>
            {" "}
            {isSearched && recievedData.length > 0 ? (
              recievedData.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))
            ) : (
              <p>No data to display</p>
            )}
          </ul>
        </div>
      )}

      {isExchangeSearch && (
        <div className="crypto-data">
          <ul>
            {exchangeData.map((exchange) => (
              <ExchangeCard key={exchange.exchangeId} exchange={exchange} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
