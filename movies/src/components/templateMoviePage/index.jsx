import { useQuery } from "@tanstack/react-query";
import PageHeader from "../pageHeader";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { getMovieImages } from "../../api/tmdb-api";
import { QUERY_KEYS } from "../../constants/queryKeys";

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.IMAGES(movie.id),
    queryFn: getMovieImages,
  });

  if (isPending) {
    return (
      <Box>
        <PageHeader movie={movie} />
        <Grid container spacing={3} sx={{ p: 3 }}>
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={400} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={400} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={400} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 9 }}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3 }} />
              <Skeleton variant="text" width="100%" height={30} />
              <Skeleton variant="text" width="95%" height={30} />
              <Skeleton variant="text" width="90%" height={30} />
              <Skeleton variant="rectangular" height={200} sx={{ mt: 3 }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {error.message}
        </Typography>
      </Box>
    );
  }

  const images = data.posters;

  return (
    <Box>
      <PageHeader movie={movie} />

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ p: { xs: 2, md: 3 } }}>
        {/* Image Gallery Sidebar */}
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              position: { xs: "relative", md: "sticky" },
              top: { md: 80 },
              maxHeight: { xs: "auto", md: "calc(100vh - 100px)" },
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              🎬 Movie Posters
            </Typography>
            <ImageList
              sx={{
                maxHeight: "calc(100vh - 180px)",
                overflowY: "auto",
              }}
              cols={1}
              gap={12}
            >
              {images.map((image) => (
                <ImageListItem
                  key={image.file_path}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, sm: 8, md: 9 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateMoviePage;
