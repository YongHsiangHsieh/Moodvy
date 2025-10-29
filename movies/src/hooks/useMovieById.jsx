import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

/**
 * Custom hook for fetching a single movie by ID with loading and error states
 * 
 * @param {string|number} id - The movie ID
 * @param {Function} queryFn - The function to fetch the movie
 * @returns {Object} { movie, isLoading, error, MovieState }
 */
export const useMovieById = (id, queryFn) => {
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: queryFn,
  });

  // Component to render loading/error states
  const MovieState = () => {
    if (isPending) {
      return <Spinner />;
    }

    if (isError) {
      return <h1>{error.message}</h1>;
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

