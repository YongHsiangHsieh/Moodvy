import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MovieListSkeleton from "../components/skeletons/MovieListSkeleton";
import { QUERY_KEYS } from "../constants/queryKeys";
import { searchMovies, searchPeople } from "../api/tmdb-api";

/**
 * Custom hook for searching movies and people in parallel
 * Handles loading and error states for both search queries
 *
 * @param {string} query - The search query string
 * @returns {Object} { movies, people, isLoading, error, SearchState }
 */
export const useSearch = (query) => {
  // Search movies
  const {
    data: moviesData,
    error: moviesError,
    isPending: isPendingMovies,
    isError: isMoviesError,
  } = useQuery({
    queryKey: QUERY_KEYS.SEARCH_MOVIES(query),
    queryFn: searchMovies,
    enabled: !!query, // Only run if query exists
  });

  // Search people
  const {
    data: peopleData,
    error: peopleError,
    isPending: isPendingPeople,
    isError: isPeopleError,
  } = useQuery({
    queryKey: QUERY_KEYS.SEARCH_PEOPLE(query),
    queryFn: searchPeople,
    enabled: !!query, // Only run if query exists
  });

  // Component to render loading/error states
  const SearchState = () => {
    if (isPendingMovies || isPendingPeople) {
      return <MovieListSkeleton />;
    }

    if (isMoviesError || isPeopleError) {
      const errorMessage = moviesError?.message || peopleError?.message;
      return (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" color="error">
            {errorMessage}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return {
    movies: moviesData?.results || [],
    people: peopleData?.results || [],
    isLoading: isPendingMovies || isPendingPeople,
    error: isMoviesError || isPeopleError ? moviesError || peopleError : null,
    SearchState,
  };
};
