import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const SORT_OPTIONS = {
  NONE: "none",
  POPULARITY: "popularity",
  RATING: "rating",
  RELEASE_DATE: "releaseDate",
};

export default function SortMoviesDropdown({ sortOption, onSortChange }) {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <FormControl sx={{ flex: 1, minWidth: 120 }} size="small">
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select
        labelId="sort-label"
        id="sort-select"
        value={sortOption}
        onChange={handleChange}
        label="Sort By"
        inputProps={{
          "aria-label": "Sort movies",
        }}
      >
        <MenuItem value={SORT_OPTIONS.NONE}>None</MenuItem>
        <MenuItem value={SORT_OPTIONS.POPULARITY}>Popularity</MenuItem>
        <MenuItem value={SORT_OPTIONS.RATING}>Rating</MenuItem>
        <MenuItem value={SORT_OPTIONS.RELEASE_DATE}>Release Date</MenuItem>
      </Select>
    </FormControl>
  );
}
