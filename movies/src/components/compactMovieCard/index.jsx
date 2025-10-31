import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarRate from "@mui/icons-material/StarRate";
import { Link } from "react-router";
import { getMovieRoute } from "../../constants/routes";
import { getMoviePosterUrl } from "../../utils/movie";
import img from "../../images/film-poster-placeholder.png";

/**
 * Compact movie card component for horizontal scrolling displays
 * Simplified version of MovieCard optimized for recommendations and similar movies
 *
 * @param {Object} props - Component props
 * @param {Object} props.movie - Movie object with id, title, poster_path, vote_average
 * @returns {JSX.Element} Compact clickable movie card
 */
const CompactMovieCard = ({ movie }) => {
  return (
    <Link
      to={getMovieRoute(movie.id)}
      style={{
        textDecoration: "none",
        minWidth: 150,
        flexShrink: 0,
      }}
    >
      <Card
        sx={{
          width: 150,
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          component="img"
          height="225"
          image={getMoviePosterUrl(movie.poster_path) || img}
          alt={movie.title}
          sx={{
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ p: 1.5 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "2.4em",
              mb: 0.5,
            }}
          >
            {movie.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarRate sx={{ fontSize: 16, color: "custom.rating" }} />
            <Typography variant="caption" color="text.secondary">
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CompactMovieCard;
