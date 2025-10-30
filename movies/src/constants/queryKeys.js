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
   * Query key for popular movies
   */
  POPULAR: ["popular"],

  /**
   * Query key for top rated movies
   */
  TOP_RATED: ["topRated"],

  /**
   * Query key for now playing movies (in theaters)
   */
  NOW_PLAYING: ["nowPlaying"],

  /**
   * Query key for trending movies
   */
  TRENDING: ["trending"],

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

  /**
   * Query key for movie credits (cast and crew)
   * @param {string|number} id - Movie ID
   */
  MOVIE_CREDITS: (id) => ["movieCredits", { id }],

  /**
   * Query key for movie recommendations
   * @param {string|number} id - Movie ID
   */
  RECOMMENDATIONS: (id) => ["recommendations", { id }],

  /**
   * Query key for similar movies
   * @param {string|number} id - Movie ID
   */
  SIMILAR: (id) => ["similar", { id }],

  /**
   * Query key for person/actor details
   * @param {string|number} id - Person ID
   */
  PERSON: (id) => ["person", { id }],

  /**
   * Query key for person's movie credits (filmography)
   * @param {string|number} id - Person ID
   */
  PERSON_CREDITS: (id) => ["personCredits", { id }],
};
