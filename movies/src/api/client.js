import { buildUrl } from "./config";

/**
 * Unified API client for all TMDB requests
 * Handles fetching, error handling, and response parsing in one place
 */
export const apiClient = async (endpoint, options = {}) => {
  const { params = {} } = options;
  const url = buildUrl(endpoint, params);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Try to get error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.status_message || `API Error: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    // Re-throw to let React Query handle it
    throw error;
  }
};

/**
 * Helper to extract ID from React Query queryKey
 * Handles the common pattern of { queryKey: ['key', { id }] }
 */
export const extractIdFromQueryKey = (queryKey) => {
  const [, idPart] = queryKey;
  return idPart?.id;
};

