import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useCrypto } from "@/api/CryptoContext";
import { MenuProps, selectedStyles } from "@/components/selectStyles";
import { MultipleSelectCheckmarksProps } from "@/interfaces/interfaces";

export default function MultipleSelectCheckmarks({
  selectedIds,
  setSelectedIds,
  setRecievedData,
  setIsSearched,
  setIsCryptoSearch,
  setIsExchangeSearch,
}: MultipleSelectCheckmarksProps): JSX.Element {
  const { cryptoData } = useCrypto();

  const handleChange = (event: SelectChangeEvent<typeof selectedIds>) => {
    const { value } = event.target;

    if (value.includes("select_all")) {
      if (selectedIds.length === cryptoData.length) {
        setSelectedIds([]);
      } else {
        setSelectedIds(cryptoData.map((crypto) => crypto.id));
      }
    } else {
      setSelectedIds(typeof value === "string" ? value.split(",") : value);
    }
  };

  const handleSubmit = async () => {
    if (selectedIds.length === 0) {
      return;
    }
    try {
      const params = new URLSearchParams();
      params.append("ids", selectedIds.join(","));
      const response = await fetch(
        `https://api.coincap.io/v2/assets?${params.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setRecievedData(data.data);
        setIsSearched(true);
        setIsExchangeSearch(false);
        setIsCryptoSearch(true);
      } else {
        console.error("Ошибка при получении данных");
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  return (
    <div className="select-wrapper">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-checkbox-label">Select Cryptos</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selectedIds}
          onChange={handleChange}
          input={<OutlinedInput label="Select Cryptos" />}
          renderValue={(selected) => {
            if (selectedIds.length === cryptoData.length) {
              return "All";
            }
            return selected
              .map((id) => {
                const crypto = cryptoData.find((crypto) => crypto.id === id);
                return crypto ? crypto.name : "";
              })
              .join(", ");
          }}
          MenuProps={MenuProps}
          sx={selectedStyles}
        >
          <MenuItem value="select_all">
            <Checkbox
              checked={selectedIds.length === cryptoData.length}
              indeterminate={
                selectedIds.length > 0 && selectedIds.length < cryptoData.length
              }
            />
            <ListItemText primary="Select All" />
          </MenuItem>
          {cryptoData
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((crypto) => (
              <MenuItem key={crypto.id} value={crypto.id}>
                <Checkbox checked={selectedIds.includes(crypto.id)} />
                <ListItemText primary={`${crypto.name} (${crypto.symbol})`} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <button
        onClick={handleSubmit}
        className="select-button"
        disabled={selectedIds.length === 0}
        aria-label="Search for selected cryptos"
      >
        Find
      </button>
    </div>
  );
}
