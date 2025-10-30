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
 * Get popular movies
 */
export const getPopularMovies = () => {
  return apiClient("/movie/popular", {
    params: {
      page: 1,
    },
  });
};

/**
 * Get top rated movies
 */
export const getTopRatedMovies = () => {
  return apiClient("/movie/top_rated", {
    params: {
      page: 1,
    },
  });
};

/**
 * Get now playing movies (currently in theaters)
 */
export const getNowPlayingMovies = () => {
  return apiClient("/movie/now_playing", {
    params: {
      page: 1,
    },
  });
};

/**
 * Get trending movies (this week)
 */
export const getTrendingMovies = () => {
  return apiClient("/trending/movie/week", {
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

/**
 * Get credits (cast and crew) for a specific movie
 * @param {Object} args - React Query args with queryKey containing movie ID
 */
export const getMovieCredits = ({ queryKey }) => {
  const id = extractIdFromQueryKey(queryKey);
  return apiClient(`/movie/${id}/credits`);
};

/**
 * Get recommended movies based on a specific movie
 * @param {Object} args - React Query args with queryKey containing movie ID
 */
export const getMovieRecommendations = ({ queryKey }) => {
  const id = extractIdFromQueryKey(queryKey);
  return apiClient(`/movie/${id}/recommendations`);
};

/**
 * Get similar movies to a specific movie
 * @param {Object} args - React Query args with queryKey containing movie ID
 */
export const getMovieSimilar = ({ queryKey }) => {
  const id = extractIdFromQueryKey(queryKey);
  return apiClient(`/movie/${id}/similar`);
};

/**
 * Get person/actor details by ID
 * @param {Object} args - React Query args with queryKey containing person ID
 */
export const getPersonDetails = ({ queryKey }) => {
  const id = extractIdFromQueryKey(queryKey);
  return apiClient(`/person/${id}`);
};

/**
 * Get movie credits for a person (their filmography)
 * @param {Object} args - React Query args with queryKey containing person ID
 */
export const getPersonMovieCredits = ({ queryKey }) => {
  const id = extractIdFromQueryKey(queryKey);
  return apiClient(`/person/${id}/movie_credits`);
};
