import truncate from "lodash/truncate";

/**
 * String utility functions
 */

/**
 * Truncate a string to a maximum length with smart word breaking
 * @param {string} string - The string to truncate
 * @param {number} maxLength - Maximum length (default: 400)
 * @returns {string} Truncated string with ellipsis
 */
export function excerpt(string, maxLength = 400) {
  return truncate(string, {
    length: maxLength,
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

/**
 * Capitalize the first letter of a string
 * @param {string} string - The string to capitalize
 * @returns {string} String with first letter capitalized
 */
export function capitalizeFirst(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Convert a string to title case
 * @param {string} string - The string to convert
 * @returns {string} String in title case
 */
export function toTitleCase(string) {
  if (!string) return "";
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => capitalizeFirst(word))
    .join(" ");
}

