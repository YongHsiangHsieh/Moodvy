import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        padding: 1.5,
        margin: 0,
        marginBottom: hasMovieDetails ? 0 : 1.5,
      }}
    >
      {showNavigation && (
        <IconButton aria-label="go back" onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>
      )}

      <Typography variant="h4" component="h3">
        {displayTitle}
        {hasMovieDetails && movie.homepage && (
          <a href={movie.homepage}>
            <HomeIcon color="primary" />
          </a>
        )}
        {hasMovieDetails && movie.tagline && (
          <>
            <br />
            <span style={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`}</span>
          </>
        )}
      </Typography>

      {showNavigation && (
        <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
          <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>
      )}
    </Paper>
  );
};

export default PageHeader;

