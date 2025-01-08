import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MenuProps, selectedStyles } from "@/components/selectStyles";
import { Alert } from "@mui/material";
import { Exchange, ExchangeSelectProps } from "@/interfaces/interfaces";

export default function ExchangeSelect({
  selectedExchanges,
  setSelectedExchanges,
  setExchangeData,
  setIsExchangeSearch,
  setIsCryptoSearch,
}: ExchangeSelectProps): JSX.Element {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchanges = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.coincap.io/v2/exchanges");
        if (response.ok) {
          const data = await response.json();
          const exchangesWithId = data.data.map(
            (exchange: Exchange, index: number) => ({
              ...exchange,
              id: exchange.exchangeId || `exchange-${index}`,
            })
          );
          setExchanges(exchangesWithId);
        } else {
          throw new Error("Ошибка при получении данных об обменниках");
        }
      } catch (error) {
        setError(`Ошибка загрузки данных: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];

    if (value.includes("select_all")) {
      if (selectedExchanges.length === exchanges.length) {
        setSelectedExchanges([]);
      } else {
        setSelectedExchanges(exchanges.map((exchange) => exchange.exchangeId));
      }
    } else {
      const filteredValue = value.filter((id) => id !== "select_all");
      setSelectedExchanges(filteredValue);
    }
  };

  const handleSubmit = async () => {
    if (selectedExchanges.length === 0) return;

    try {
      const exchangeDataPromises = selectedExchanges.map(async (id) => {
        const response = await fetch(
          `https://api.coincap.io/v2/exchanges/${id}`
        );
        if (!response.ok) {
          throw new Error(`Ошибка при запросе данных для ID: ${id}`);
        }
        return response.json();
      });

      const results = await Promise.all(exchangeDataPromises);
      const allExchangeData = results.map((result) => result.data);
      setExchangeData(allExchangeData);
      setIsCryptoSearch(false);
      setIsExchangeSearch(true);
    } catch (error) {
      setError(`Ошибка запроса: ${error}`);
    }
  };

  return (
    <div className="select-wrapper">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-exchanges-label">Select Exchanges</InputLabel>
        <Select
          labelId="multiple-exchanges-label"
          id="multiple-exchanges"
          multiple
          value={selectedExchanges}
          onChange={handleChange}
          input={<OutlinedInput label="Select Exchanges" />}
          renderValue={(selected) => {
            if (selected.length === exchanges.length) {
              return "All Exchanges";
            }
            if (selected.length === 0) {
              return "None Selected";
            }
            return selected
              .map(
                (id) =>
                  exchanges.find((exchange) => exchange.exchangeId === id)
                    ?.name || "(Unknown)"
              )
              .join(", ");
          }}
          MenuProps={MenuProps}
          sx={selectedStyles}
        >
          <MenuItem key="select_all" value="select_all">
            <Checkbox
              checked={
                selectedExchanges.length === exchanges.length &&
                exchanges.length > 0
              }
              indeterminate={
                selectedExchanges.length > 0 &&
                selectedExchanges.length < exchanges.length
              }
            />
            <ListItemText primary="Select All Exchanges" />
          </MenuItem>

          {exchanges.map((exchange) => (
            <MenuItem key={exchange.exchangeId} value={exchange.exchangeId}>
              <Checkbox
                checked={selectedExchanges.includes(exchange.exchangeId)}
              />
              <ListItemText
                primary={`${exchange.name} (Rank: ${exchange.rank})`}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && <div></div>}
      {error && <Alert severity="error">{error}</Alert>}
      <button
        onClick={handleSubmit}
        className="select-button"
        disabled={selectedExchanges.length === 0}
      >
        Find
      </button>
    </div>
  );
}
