/**
 * Movie-specific utility functions
 */

/**
 * Map genre objects to genre IDs for filtering compatibility
 * This is needed because the API returns different formats:
 * - Movie lists: genre_ids (array of numbers)
 * - Movie details: genres (array of {id, name} objects)
 *
 * @param {Object} movie - Movie object with genres array
 * @returns {Object} Movie object with genre_ids added
 */
export function mapMovieGenres(movie) {
  if (!movie) return movie;

  // If movie already has genre_ids, return as is
  if (movie.genre_ids) return movie;

  // If movie has genres array, map to genre_ids
  if (movie.genres && Array.isArray(movie.genres)) {
    return {
      ...movie,
      genre_ids: movie.genres.map((g) => g.id),
    };
  }

  return movie;
}

/**
 * Format movie runtime to hours and minutes
 * @param {number} minutes - Runtime in minutes
 * @returns {string} Formatted runtime (e.g., "2h 30m")
 */
export function formatRuntime(minutes) {
  if (!minutes) return "N/A";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}m`;
}

/**
 * Format currency values
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = "USD") {
  if (!amount || amount === 0) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get movie poster URL
 * @param {string} posterPath - Poster path from TMDB
 * @param {string} size - Image size (default: w500)
 * @returns {string} Full poster URL
 */
export function getMoviePosterUrl(posterPath, size = "w500") {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}/${posterPath}`;
}

/**
 * Get actor profile image URL
 * @param {string} profilePath - Profile path from TMDB
 * @param {string} size - Image size (default: w185)
 * @returns {string|null} Full profile image URL or null if no path
 */
export function getActorProfileUrl(profilePath, size = "w185") {
  if (!profilePath) return null;
  return `https://image.tmdb.org/t/p/${size}${profilePath}`;
}

/**
 * Format movie release year
 * @param {string} releaseDate - Release date string (YYYY-MM-DD)
 * @returns {string} Release year
 */
export function getMovieYear(releaseDate) {
  if (!releaseDate) return "N/A";
  return releaseDate.split("-")[0];
}
