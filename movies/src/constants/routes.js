/**
 * Application route constants
 * Centralized route definitions to avoid magic strings and enable refactor-safe routing
 */

export const ROUTES = {
  HOME: "/",
  MOVIES: {
    FAVORITES: "/movies/favorites",
    UPCOMING: "/movies/upcoming",
    DETAILS: "/movies/:id",
  },
  REVIEWS: {
    VIEW: "/reviews/:id",
    FORM: "/reviews/form",
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

