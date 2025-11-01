/**
 * Application route constants
 * Centralized route definitions to avoid magic strings and enable refactor-safe routing
 */

export const ROUTES = {
  HOME: "/",
  MOVIES: {
    FAVORITES: "/movies/favorites",
    UPCOMING: "/movies/upcoming",
    POPULAR: "/movies/popular",
    TOP_RATED: "/movies/top_rated",
    NOW_PLAYING: "/movies/now_playing",
    DETAILS: "/movies/:id",
  },
  REVIEWS: {
    VIEW: "/reviews/:id",
    FORM: "/reviews/form",
  },
  ACTORS: {
    DETAILS: "/actors/:id",
  },
  SEARCH: {
    RESULTS: "/search",
  },
};

/**
 * Helper function to build movie detail route
 * @param {string|number} id - Movie ID
 */
export const getMovieRoute = (id) => `/movies/${id}`;

/**
 * Helper function to build review route
 * @param {string|number} id - Review ID
 */
export const getReviewRoute = (id) => `/reviews/${id}`;

/**
 * Helper function to build actor detail route
 * @param {string|number} id - Actor/Person ID
 */
export const getActorRoute = (id) => `/actors/${id}`;

/**
 * Helper function to build search results route
 * @param {string} query - Search query string
 */
export const getSearchRoute = (query) =>
  `/search?q=${encodeURIComponent(query)}`;
