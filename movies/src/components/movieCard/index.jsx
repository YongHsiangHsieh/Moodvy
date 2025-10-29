import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router";
import { getMovieRoute } from "../../constants/routes";

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);

  const isFavorite = favorites.find((id) => id === movie.id);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
    >
      {isFavorite && (
        <Chip
          icon={<FavoriteIcon />}
          label="Favorite"
          color="error"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            fontWeight: 600,
          }}
        />
      )}

      <CardHeader
        title={
          <Typography
            variant="h6"
            component="h3"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "3em",
            }}
          >
            {movie.title}
          </Typography>
        }
        sx={{ pb: 1 }}
      />

      <CardMedia
        sx={{
          height: 400,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
        title={movie.title}
      />

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {movie.release_date || "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarRateIcon fontSize="small" sx={{ color: "custom.rating" }} />
              <Typography variant="body2" fontWeight={600}>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        {action(movie)}

        <Link to={getMovieRoute(movie.id)} style={{ marginLeft: "auto" }}>
          <Button variant="contained" size="small">
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
