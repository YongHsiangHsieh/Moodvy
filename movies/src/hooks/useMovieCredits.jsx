import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { QUERY_KEYS } from "../constants/queryKeys";
import HorizontalScrollContainer from "../components/horizontalScrollContainer";

/**
 * Custom hook for fetching movie credits (cast and crew) with loading and error states
 *
 * @param {string|number} movieId - The movie ID
 * @param {Function} queryFn - The function to fetch movie credits
 * @returns {Object} { cast, crew, isLoading, error, MovieCreditsState }
 */
export const useMovieCredits = (movieId, queryFn) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.MOVIE_CREDITS(movieId),
    queryFn: queryFn,
  });

  // Component to render loading/error states
  const MovieCreditsState = () => {
    if (isPending) {
      return (
        <HorizontalScrollContainer sx={{ mb: 3 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Box key={i} sx={{ minWidth: 120, flexShrink: 0 }}>
              <Skeleton variant="circular" width={120} height={120} />
              <Skeleton variant="text" width="100%" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="80%" />
            </Box>
          ))}
        </HorizontalScrollContainer>
      );
    }

    if (isError) {
      return (
        <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Could not load cast information
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return {
    cast: data?.cast || [],
    crew: data?.crew || [],
    isLoading: isPending,
    error: isError ? error : null,
    MovieCreditsState,
  };
};
