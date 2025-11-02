import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import PageHeader from "../components/pageHeader";
import MovieCard from "../components/movieCard";
import MovieListSkeleton from "../components/skeletons/MovieListSkeleton";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QUERY_KEYS } from "../constants/queryKeys";
import { mapMovieGenres } from "../utils/movie";

const MyListPage = () => {
  const { favorites, mustWatch } = useContext(MoviesContext);

  // Fetch favorites separately
  const favoriteMovieQueries = useQueries({
    queries: favorites.map((movieId) => ({
      queryKey: QUERY_KEYS.MOVIE(movieId),
      queryFn: getMovie,
    })),
  });

  // Fetch must-watch movies separately
  const mustWatchMovieQueries = useQueries({
    queries: mustWatch.map((movieId) => ({
      queryKey: QUERY_KEYS.MOVIE(movieId),
      queryFn: getMovie,
    })),
  });

  // Check if any of the parallel queries is still loading
  const isPending =
    favoriteMovieQueries.find((m) => m.isPending === true) ||
    mustWatchMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <MovieListSkeleton />;
  }

  // Map genre_ids for filtering compatibility
  const favoriteMovies = favoriteMovieQueries.map((q) =>
    mapMovieGenres(q.data)
  );
  const mustWatchMovies = mustWatchMovieQueries.map((q) =>
    mapMovieGenres(q.data)
  );

  const hasAnyMovies = favoriteMovies.length > 0 || mustWatchMovies.length > 0;

  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title="My List" />
      </Grid>

      {!hasAnyMovies && (
        <Grid size={12}>
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Your list is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Start adding movies to your favorites or must-watch list
            </Typography>
          </Box>
        </Grid>
      )}

      {favoriteMovies.length > 0 && (
        <Grid size={12} sx={{ p: { xs: 2, md: 2.5 } }}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            ❤️ Favorite Movies ({favoriteMovies.length})
          </Typography>
          <Grid container spacing={2}>
            {favoriteMovies.map((movie) => (
              <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <MovieCard
                  movie={movie}
                  action={(movie) => (
                    <>
                      <RemoveFromFavorites movie={movie} />
                      <WriteReview movie={movie} />
                    </>
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      {mustWatchMovies.length > 0 && (
        <Grid size={12} sx={{ p: { xs: 2, md: 2.5 } }}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            📺 Must Watch ({mustWatchMovies.length})
          </Typography>
          <Grid container spacing={2}>
            {mustWatchMovies.map((movie) => (
              <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <MovieCard
                  movie={movie}
                  action={(movie) => (
                    <>
                      <RemoveFromFavorites movie={movie} />
                      <WriteReview movie={movie} />
                    </>
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default MyListPage;
