import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import { QUERY_KEYS } from "../constants/queryKeys";

/**
 * Custom hook for fetching a single movie by ID with loading and error states
 * 
 * @param {string|number} id - The movie ID
 * @param {Function} queryFn - The function to fetch the movie
 * @returns {Object} { movie, isLoading, error, MovieState }
 */
export const useMovieById = (id, queryFn) => {
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.MOVIE(id),
    queryFn: queryFn,
  });

  // Component to render loading/error states
  const MovieState = () => {
    if (isPending) {
      return (
        <Box sx={{ p: 3 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={400} sx={{ mb: 3 }} />
            <Skeleton variant="text" width="100%" height={40} />
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="90%" height={40} />
          </Paper>
        </Box>
      );
    }

    if (isError) {
      return (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" color="error">
            {error.message}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return {
    movie,
    isLoading: isPending,
    error: isError ? error : null,
    MovieState,
  };
};

