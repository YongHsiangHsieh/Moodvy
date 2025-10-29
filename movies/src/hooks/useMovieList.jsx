import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

/**
 * Custom hook for fetching a list of movies with loading and error states
 * Handles the common pattern of displaying spinner while loading and error message on error
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
      return <Spinner />;
    }

    if (isError) {
      return <h1>{error.message}</h1>;
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

