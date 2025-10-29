import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useMovieList } from "../hooks/useMovieList.jsx";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { QUERY_KEYS } from "../constants/queryKeys";

const UpcomingMoviesPage = () => {
  const { movies, MovieListState } = useMovieList(QUERY_KEYS.UPCOMING, getUpcomingMovies);

  // Show loading or error state if needed
  const stateComponent = MovieListState();
  if (stateComponent) return stateComponent;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToMustWatchIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
