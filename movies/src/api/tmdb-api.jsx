import { apiClient, extractIdFromQueryKey } from "./client";

/**
 * TMDB API Functions
 * All functions use the centralized API client for consistent error handling
 */

/**
 * Get discover movies (homepage)
 */
export const getMovies = () => {
  return apiClient("/discover/movie", {
    params: {
      include_adult: false,
      include_video: false,
      page: 1,
    },
  });
};

/**
 * Get upcoming movies
 */
export const getUpcomingMovies = () => {
  return apiClient("/movie/upcoming", {
    params: {
      page: 1,
    },
  });
};

/**
 * Get single movie by ID
 * @param {Object} args - React Query args with queryKey
 */
export const getMovie = (args) => {
  const id = extractIdFromQueryKey(args.queryKey);
  return apiClient(`/movie/${id}`);
};

/**
 * Get all movie genres
 */
export const getGenres = () => {
  return apiClient("/genre/movie/list");
};

/**
 * Get images for a specific movie
 * @param {Object} args - React Query args with queryKey containing movie ID
 */
export const getMovieImages = ({ queryKey }) => {
  const id = extractIdFromQueryKey(queryKey);
  return apiClient(`/movie/${id}/images`);
};

/**
 * Get reviews for a specific movie
 * @param {Object} args - React Query args with queryKey containing movie ID
 */
export const getMovieReviews = ({ queryKey }) => {
  const id = extractIdFromQueryKey(queryKey);
  return apiClient(`/movie/${id}/reviews`);
};
