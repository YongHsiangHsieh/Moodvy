import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useMovieList } from "../hooks/useMovieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { QUERY_KEYS } from "../constants/queryKeys";

const TopRatedMoviesPage = () => {
  const { movies, MovieListState } = useMovieList(
    QUERY_KEYS.TOP_RATED,
    getTopRatedMovies
  );

  // Show loading or error state if needed
  const stateComponent = MovieListState();
  if (stateComponent) return stateComponent;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TopRatedMoviesPage;
