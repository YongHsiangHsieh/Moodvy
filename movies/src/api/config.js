/**
 * TMDB API Configuration
 * Centralized configuration for all API requests
 */

export const API_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: import.meta.env.VITE_TMDB_KEY,
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p",
  DEFAULT_LANGUAGE: "en-US",
  DEFAULT_PARAMS: {
    language: "en-US",
  },
};

/**
 * Build URL with query parameters
 */
export const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  
  // Add API key
  url.searchParams.append("api_key", API_CONFIG.API_KEY);
  
  // Add default and custom parameters
  const allParams = { ...API_CONFIG.DEFAULT_PARAMS, ...params };
  Object.entries(allParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  
  return url.toString();
};

