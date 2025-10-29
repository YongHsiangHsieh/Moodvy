import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MovieListSkeleton from "../components/skeletons/MovieListSkeleton";

/**
 * Custom hook for fetching a list of movies with loading and error states
 * Handles the common pattern of displaying skeleton loaders while loading and error message on error
 * 
 * @param {Array} queryKey - The query key for React Query caching
 * @param {Function} queryFn - The function to fetch the movies
 * @returns {Object} { movies, isLoading, error, MovieListState }
 */
export const useMovieList = (queryKey, queryFn) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  // Component to render loading/error states
  const MovieListState = () => {
    if (isPending) {
      return <MovieListSkeleton />;
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
    movies: data?.results || [],
    isLoading: isPending,
    error: isError ? error : null,
    MovieListState,
  };
};

