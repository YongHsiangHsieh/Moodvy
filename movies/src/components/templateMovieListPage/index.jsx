import React, { useState } from "react";
import PageHeader from "../pageHeader";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState([0, 10]);
  const [yearFilter, setYearFilter] = useState("");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      const rating = m.vote_average || 0;
      return rating >= ratingFilter[0] && rating <= ratingFilter[1];
    })
    .filter((m) => {
      if (!yearFilter) return true;
      const releaseYear = m.release_date
        ? new Date(m.release_date).getFullYear()
        : null;
      const fromYear = Number(yearFilter);
      const currentYear = new Date().getFullYear();

      if (!releaseYear) return false;
      return releaseYear >= fromYear && releaseYear <= currentYear;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "year") setYearFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title={title} />
      </Grid>
      <Grid size={12}>
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
          ratingFilter={ratingFilter}
          yearFilter={yearFilter}
        />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
