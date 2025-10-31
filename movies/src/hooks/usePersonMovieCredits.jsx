import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QUERY_KEYS } from "../constants/queryKeys";
import MovieCardSkeleton from "../components/skeletons/MovieCardSkeleton";
import HorizontalScrollContainer from "../components/horizontalScrollContainer";

/**
 * Custom hook for fetching an actor's movie credits (filmography) with loading and error states
 *
 * @param {string|number} personId - The person/actor ID to get movie credits for
 * @param {Function} queryFn - The function to fetch person movie credits
 * @returns {Object} { movies, isLoading, error, FilmographyState }
 */
export const usePersonMovieCredits = (personId, queryFn) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.PERSON_CREDITS(personId),
    queryFn: queryFn,
  });

  // Component to render loading/error states
  const FilmographyState = () => {
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
            Could not load filmography
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return {
    movies: data?.cast || [],
    isLoading: isPending,
    error: isError ? error : null,
    FilmographyState,
  };
};
