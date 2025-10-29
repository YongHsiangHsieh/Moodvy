/**
 * React Query key constants
 * Centralized query key factory functions for type-safe and consistent caching
 */

export const QUERY_KEYS = {
  /**
   * Query key for discover movies (homepage)
   */
  DISCOVER: ["discover"],

  /**
   * Query key for upcoming movies
   */
  UPCOMING: ["upcoming"],

  /**
   * Query key for a single movie by ID
   * @param {string|number} id - Movie ID
   */
  MOVIE: (id) => ["movie", { id }],

  /**
   * Query key for all genres
   */
  GENRES: ["genres"],

  /**
   * Query key for movie images
   * @param {string|number} id - Movie ID
   */
  IMAGES: (id) => ["images", { id }],

  /**
   * Query key for movie reviews
   * @param {string|number} id - Movie ID
   */
  REVIEWS: (id) => ["reviews", { id }],
};

