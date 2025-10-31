import React from "react";
import Box from "@mui/material/Box";

/**
 * Reusable horizontal scroll container with custom styled scrollbar
 * Used for displaying cast, recommendations, similar movies, etc.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display in horizontal scroll
 * @param {Object} props.sx - Additional MUI sx prop styles (optional)
 * @returns {JSX.Element} Horizontal scrollable container
 */
const HorizontalScrollContainer = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        pb: 2,
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "action.hover",
          borderRadius: 4,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "action.active",
          borderRadius: 4,
          "&:hover": {
            backgroundColor: "action.selected",
          },
        },
        ...sx, // Allow custom styles to override defaults
      }}
    >
      {children}
    </Box>
  );
};

export default HorizontalScrollContainer;
