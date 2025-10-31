import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QUERY_KEYS } from "../constants/queryKeys";
import MovieCardSkeleton from "../components/skeletons/MovieCardSkeleton";
import HorizontalScrollContainer from "../components/horizontalScrollContainer";

/**
 * Custom hook for fetching similar movies with loading and error states
 *
 * @param {string|number} movieId - The movie ID to find similar movies for
 * @param {Function} queryFn - The function to fetch similar movies
 * @returns {Object} { movies, isLoading, error, SimilarMoviesState }
 */
export const useMovieSimilar = (movieId, queryFn) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.SIMILAR(movieId),
    queryFn: queryFn,
  });

  // Component to render loading/error states
  const SimilarMoviesState = () => {
    if (isPending) {
      return (
        <HorizontalScrollContainer>
          {[1, 2, 3, 4, 5].map((i) => (
            <Box key={i} sx={{ minWidth: 200, flexShrink: 0 }}>
              <MovieCardSkeleton />
            </Box>
          ))}
        </HorizontalScrollContainer>
      );
    }

    if (isError) {
      return (
        <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Could not load similar movies
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return {
    movies: data?.results || [],
    isLoading: isPending,
    error: isError ? error : null,
    SimilarMoviesState,
  };
};
