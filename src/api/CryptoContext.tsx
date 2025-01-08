import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCryptoData } from "@/api/fetchCrypto";
import { Crypto } from "@/interfaces/interfaces";
import { CryptoContextProps } from "@/interfaces/interfaces";

const CryptoContext = createContext<CryptoContextProps | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocalStorageEnabled, setLocalStorageEnabled] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
        setLoading(false);
        setLocalStorageEnabled(undefined);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <CryptoContext.Provider value={{ cryptoData, loading, error, isLocalStorageEnabled, setLocalStorageEnabled }}>
      {children}
    </CryptoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCrypto must be used within a CryptoProvider");
  }
  return context;
};