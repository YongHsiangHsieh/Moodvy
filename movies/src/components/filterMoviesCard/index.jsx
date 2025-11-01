import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useNavigate } from "react-router";
import { getSearchRoute } from "../../constants/routes";

export default function FilterMoviesCard(props) {
  const navigate = useNavigate();

  const { data, error, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.GENRES,
    queryFn: getGenres,
  });

  if (isPending) {
    return (
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Skeleton variant="rectangular" width={200} height={56} />
          <Skeleton variant="rectangular" width={200} height={56} />
          <Skeleton variant="rectangular" width={200} height={56} />
        </Box>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Paper sx={{ p: 3, mb: 3, textAlign: "center" }}>
        <Typography color="error">{error.message}</Typography>
      </Paper>
    );
  }

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search");
    if (query?.trim()) {
      navigate(getSearchRoute(query.trim()));
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
        <Box component="form" onSubmit={handleSearchSubmit} sx={{ flex: 1 }}>
          <TextField
            fullWidth
            name="search"
            placeholder="Search movies or actors..."
            type="search"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{
              "aria-label": "Search movies or actors",
            }}
          />
        </Box>

        <TextField
          sx={{ flex: 1 }}
          id="filter-movies"
          label="Filter by title"
          type="search"
          size="small"
          value={props.titleFilter}
          onChange={handleTextChange}
          inputProps={{
            "aria-label": "Filter movies by title",
          }}
        />

        <FormControl sx={{ flex: 1, minWidth: 120 }} size="small">
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
            label="Genre"
            inputProps={{
              "aria-label": "Filter movies by genre",
            }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ flex: 1, minWidth: 220, px: 2 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            gutterBottom
            sx={{ display: "block", mb: 0.5 }}
          >
            Rating:{" "}
            {props.ratingFilter
              ? `${props.ratingFilter[0]} - ${props.ratingFilter[1]}`
              : "0 - 10"}
          </Typography>
          <Slider
            value={props.ratingFilter || [0, 10]}
            onChange={(e, newValue) => handleChange(e, "rating", newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.5}
            marks={[
              { value: 0, label: "0" },
              { value: 5, label: "5" },
              { value: 10, label: "10" },
            ]}
            aria-label="Rating range filter"
            sx={{
              mt: 1,
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
              },
              "& .MuiSlider-mark": {
                height: 8,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 200,
            display: "flex",
            gap: 1,
            alignItems: "flex-end",
          }}
        >
          <TextField
            label="Year From"
            type="number"
            size="small"
            value={props.yearFilter?.from || ""}
            onChange={(e) =>
              handleChange(e, "year", {
                ...props.yearFilter,
                from: e.target.value,
              })
            }
            inputProps={{
              min: 1900,
              max: new Date().getFullYear() + 5,
              "aria-label": "Filter by year from",
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Year To"
            type="number"
            size="small"
            value={props.yearFilter?.to || ""}
            onChange={(e) =>
              handleChange(e, "year", {
                ...props.yearFilter,
                to: e.target.value,
              })
            }
            inputProps={{
              min: 1900,
              max: new Date().getFullYear() + 5,
              "aria-label": "Filter by year to",
            }}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
