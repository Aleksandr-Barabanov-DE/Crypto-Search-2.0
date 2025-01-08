import React from "react";
import "@/styles/customFilter.scss";
import ascendingImg from "@/assets/ascending.png";
import descendingImg from "@/assets/descending.png";

type SortCriterion = "price" | "marketCap" | "change" | "rank";

interface CustomFilterProps {
  sortCriterion: string;
  setSortCriterion: React.Dispatch<React.SetStateAction<SortCriterion>>;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  options: { value: string; label: string }[];
}

const CustomFilter: React.FC<CustomFilterProps> = ({
  sortCriterion,
  setSortCriterion,
  sortDirection,
  setSortDirection,
  options,
}) => {
  return (
    <div className="sorting-controls">
      <div className="sorting-controls__select-container">
        {" "}
        <label htmlFor="sort-criterion" className="sorting-controls__label">
          Sort by:
        </label>
        <select
          id="sort-criterion"
          className="sorting-controls__select"
          value={sortCriterion}
          onChange={(e) => setSortCriterion(e.target.value as SortCriterion)}
        >
          {options.map((option) => (
            <option
              className="sorting-controls__select__option"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>{" "}
      </div>

      <button
        className="sorting-controls__button"
        onClick={() =>
          setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        }
        aria-label={`Set sort direction to ${sortDirection === "asc" ? "descending" : "ascending"
          }`}
      >
        {/* Sort: {sortDirection === "asc" ? "Ascending" : "Descending"} */}
        <img
          className="sorting-controls__img"
          src={sortDirection === "asc" ? ascendingImg : descendingImg}
          alt=""
        />
      </button>
    </div>
  );
};

export default CustomFilter;
