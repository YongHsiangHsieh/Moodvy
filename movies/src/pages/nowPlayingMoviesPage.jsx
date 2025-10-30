import React from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useMovieList } from "../hooks/useMovieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { QUERY_KEYS } from "../constants/queryKeys";

const NowPlayingMoviesPage = () => {
  const { movies, MovieListState } = useMovieList(
    QUERY_KEYS.NOW_PLAYING,
    getNowPlayingMovies
  );

  // Show loading or error state if needed
  const stateComponent = MovieListState();
  if (stateComponent) return stateComponent;

  return (
    <PageTemplate
      title="Now Playing in Theaters"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default NowPlayingMoviesPage;
