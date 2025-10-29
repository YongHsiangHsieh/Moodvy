import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublicIcon from "@mui/icons-material/Public";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import MovieReviews from "../movieReviews";

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box>
      {/* Overview Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
          Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {movie.overview}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Genres */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Genres
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {movie.genres.map((g) => (
            <Chip
              key={g.name}
              label={g.name}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Production Countries */}
      {movie.production_countries?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            <PublicIcon sx={{ fontSize: 20, mr: 1, verticalAlign: "text-bottom" }} />
            Production Countries
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {movie.production_countries.map((country) => (
              <Chip
                key={country.iso_3166_1 ?? country.name}
                label={country.name}
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Movie Stats */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Details
        </Typography>
        <Paper elevation={0} sx={{ p: 2, bgcolor: "background.default" }}>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeIcon color="action" />
              <Typography variant="body2" fontWeight={500}>
                Runtime:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.runtime} minutes
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MonetizationIcon sx={{ color: "custom.revenue" }} />
              <Typography variant="body2" fontWeight={500}>
                Revenue:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${movie.revenue.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StarRate sx={{ color: "custom.rating" }} />
              <Typography variant="body2" fontWeight={500}>
                Rating:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} votes)
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarTodayIcon color="action" />
              <Typography variant="body2" fontWeight={500}>
                Release Date:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.release_date}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>

      {/* Reviews FAB */}
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          textTransform: "none",
        }}
      >
        <RateReviewIcon sx={{ mr: 1 }} />
        Reviews
      </Fab>

      {/* Reviews Drawer */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            maxHeight: "80vh",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          },
        }}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </Box>
  );
};

export default MovieDetails;
