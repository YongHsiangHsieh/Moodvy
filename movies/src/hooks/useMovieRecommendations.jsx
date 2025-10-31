import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QUERY_KEYS } from "../constants/queryKeys";
import MovieCardSkeleton from "../components/skeletons/MovieCardSkeleton";
import HorizontalScrollContainer from "../components/horizontalScrollContainer";

/**
 * Custom hook for fetching movie recommendations with loading and error states
 *
 * @param {string|number} movieId - The movie ID to get recommendations for
 * @param {Function} queryFn - The function to fetch movie recommendations
 * @returns {Object} { movies, isLoading, error, RecommendationsState }
 */
export const useMovieRecommendations = (movieId, queryFn) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.RECOMMENDATIONS(movieId),
    queryFn: queryFn,
  });

  // Component to render loading/error states
  const RecommendationsState = () => {
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
            Could not load recommendations
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
    RecommendationsState,
  };
};
