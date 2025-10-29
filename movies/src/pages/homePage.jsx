import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useMovieList } from "../hooks/useMovieList.jsx";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { QUERY_KEYS } from "../constants/queryKeys";

const HomePage = () => {
  const { movies, MovieListState } = useMovieList(QUERY_KEYS.DISCOVER, getMovies);

  // Show loading or error state if needed
  const stateComponent = MovieListState();
  if (stateComponent) return stateComponent;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default HomePage;
