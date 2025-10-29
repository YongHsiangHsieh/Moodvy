import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router";

/**
 * Unified page header component
 * Handles both simple title headers and movie detail headers
 * 
 * @param {string} title - Simple title text (for list pages)
 * @param {Object} movie - Movie object with title, homepage, tagline (for detail pages)
 * @param {boolean} showNavigation - Whether to show back/forward buttons (default: true)
 */
const PageHeader = ({ title, movie, showNavigation = true }) => {
  const navigate = useNavigate();

  // Determine what to display based on props
  const displayTitle = movie ? movie.title : title;
  const hasMovieDetails = Boolean(movie);

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 2,
        mb: hasMovieDetails ? 0 : 3,
        background: (theme) =>
          hasMovieDetails
            ? `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`
            : theme.palette.background.paper,
      }}
    >
      {showNavigation && (
        <Tooltip title="Go back">
          <IconButton
            aria-label="go back"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      )}

      <Box sx={{ flexGrow: 1, textAlign: "center" }}>
        <Typography
          variant={hasMovieDetails ? "h4" : "h5"}
          component="h1"
          fontWeight={700}
          sx={{ mb: hasMovieDetails && movie.tagline ? 1 : 0 }}
        >
          {displayTitle}
          {hasMovieDetails && movie.homepage && (
            <Tooltip title="Visit official homepage">
              <IconButton
                component="a"
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ml: 1 }}
                size="small"
              >
                <HomeIcon color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>

        {hasMovieDetails && movie.tagline && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontStyle="italic"
          >
            "{movie.tagline}"
          </Typography>
        )}
      </Box>

      {showNavigation && (
        <Tooltip title="Go forward">
          <IconButton
            aria-label="go forward"
            onClick={() => navigate(+1)}
            sx={{ ml: 2 }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Tooltip>
      )}
    </Paper>
  );
};

export default PageHeader;

