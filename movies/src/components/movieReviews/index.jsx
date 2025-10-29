import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../utils/string";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { getReviewRoute } from "../../constants/routes";

export default function MovieReviews({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.REVIEWS(movie.id),
    queryFn: getMovieReviews,
  });

  if (isPending) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="30%" height={32} />
            <Skeleton variant="text" width="50%" height={20} />
          </Box>
        </Box>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Skeleton variant="text" width={80} /></TableCell>
                <TableCell><Skeleton variant="text" width={100} /></TableCell>
                <TableCell align="right"><Skeleton variant="text" width={80} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton variant="rounded" width={100} height={32} /></TableCell>
                  <TableCell><Skeleton variant="text" width="90%" /></TableCell>
                  <TableCell align="right"><Skeleton variant="rounded" width={120} height={36} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );
  }

  const reviews = data.results;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <RateReviewIcon color="primary" sx={{ fontSize: 32 }} />
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Reviews
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""} for {movie.title}
          </Typography>
        </Box>
      </Box>

      {reviews.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", bgcolor: "background.default" }}>
          <Typography color="text.secondary">
            No reviews available for this movie yet.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 550 }} aria-label="reviews table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Excerpt</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((r) => (
                <TableRow
                  key={r.id}
                  sx={{
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Chip
                      label={r.author}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {excerpt(r.content, 200)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link
                      to={getReviewRoute(r.id)}
                      state={{
                        review: r,
                        movie: movie,
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" variant="outlined">
                        Read Full Review
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
