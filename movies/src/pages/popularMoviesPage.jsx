import React from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useMovieList } from "../hooks/useMovieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { QUERY_KEYS } from "../constants/queryKeys";

const PopularMoviesPage = () => {
  const { movies, MovieListState } = useMovieList(
    QUERY_KEYS.POPULAR,
    getPopularMovies
  );

  // Show loading or error state if needed
  const stateComponent = MovieListState();
  if (stateComponent) return stateComponent;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default PopularMoviesPage;
