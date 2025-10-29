import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import MovieListSkeleton from "../components/skeletons/MovieListSkeleton";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { QUERY_KEYS } from "../constants/queryKeys";
import { mapMovieGenres } from "../utils/movie";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel
  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: QUERY_KEYS.MOVIE(movieId),
      queryFn: getMovie,
    })),
  });

  // Check if any of the parallel queries is still loading
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <MovieListSkeleton />;
  }

  // Map genre_ids for filtering compatibility
  const movies = favoriteMovieQueries.map((q) => mapMovieGenres(q.data));

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;
