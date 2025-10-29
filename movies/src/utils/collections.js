/**
 * Generic collection management utilities
 * Provides reusable functions for managing arrays of IDs
 */

/**
 * Creates a set of collection handler functions for managing an array of IDs
 * This eliminates duplicate logic for favorites, must-watch, etc.
 * 
 * @param {Array} collection - The current collection array
 * @param {Function} setCollection - The state setter function
 * @returns {Object} Handler functions for the collection
 */
export const createCollectionHandlers = (collection, setCollection) => {
  return {
    /**
     * Add an item to the collection (only if not already present)
     */
    add: (item) => {
      setCollection((prev) => {
        // Avoid duplicate additions
        if (prev.includes(item.id)) {
          return prev;
        }
        return [...prev, item.id];
      });
    },

    /**
     * Remove an item from the collection
     */
    remove: (item) => {
      setCollection((prev) => prev.filter((id) => id !== item.id));
    },

    /**
     * Check if an item exists in the collection
     */
    has: (item) => {
      return collection.includes(item.id);
    },

    /**
     * Get all IDs in the collection
     */
    getAll: () => {
      return collection;
    },

    /**
     * Clear the entire collection
     */
    clear: () => {
      setCollection([]);
    },
  };
};

