import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import { getActorProfileUrl, sortMoviesByPopularity } from "../../utils/movie";
import CompactMovieCard from "../compactMovieCard";
import HorizontalScrollContainer from "../horizontalScrollContainer";

const ActorDetails = ({ person, movies, FilmographyState }) => {
  // Sort movies by popularity to show most famous roles first
  const sortedMovies = sortMoviesByPopularity(movies);

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: 3,
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      {/* Actor Profile Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {/* Profile Photo */}
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Box
              component="img"
              src={getActorProfileUrl(person.profile_path)}
              alt={person.name}
              sx={{
                width: { xs: 200, sm: 250, md: 300 },
                height: { xs: 300, sm: 375, md: 450 },
                borderRadius: 2,
                objectFit: "cover",
                boxShadow: 3,
              }}
            />
          </Box>

          {/* Biography & Details */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {person.name}
            </Typography>

            {/* Quick Info Chips */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
            >
              {person.known_for_department && (
                <Chip
                  icon={<PersonIcon />}
                  label={person.known_for_department}
                  color="primary"
                  size="small"
                />
              )}
              {person.birthday && (
                <Chip
                  icon={<CakeIcon />}
                  label={new Date(person.birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  size="small"
                />
              )}
              {person.place_of_birth && (
                <Chip
                  icon={<PlaceIcon />}
                  label={person.place_of_birth}
                  size="small"
                />
              )}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Biography */}
            {person.biography && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Biography
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    textAlign: "justify",
                    whiteSpace: "pre-line",
                  }}
                >
                  {person.biography}
                </Typography>
              </>
            )}

            {!person.biography && (
              <Typography variant="body2" color="text.secondary">
                No biography available.
              </Typography>
            )}
          </Box>
        </Stack>
      </Paper>

      {/* Filmography Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Known For
        </Typography>

        {sortedMovies.length > 0 ? (
          <HorizontalScrollContainer>
            {sortedMovies.slice(0, 20).map((movie) => (
              <Box key={movie.id} sx={{ minWidth: 150, flexShrink: 0 }}>
                <CompactMovieCard movie={movie} />
              </Box>
            ))}
          </HorizontalScrollContainer>
        ) : (
          <FilmographyState />
        )}

        {sortedMovies.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No filmography available.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ActorDetails;
