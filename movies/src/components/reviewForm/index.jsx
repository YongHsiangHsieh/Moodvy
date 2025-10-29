import React, { useState, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";

const ratings = [
  {
    value: 5,
    label: "Excellent ⭐⭐⭐⭐⭐",
  },
  {
    value: 4,
    label: "Good ⭐⭐⭐⭐",
  },
  {
    value: 3,
    label: "Average ⭐⭐⭐",
  },
  {
    value: 2,
    label: "Poor ⭐⭐",
  },
  {
    value: 1,
    label: "Terrible ⭐",
  },
];

const ReviewForm = ({ movie }) => {
  const context = useContext(MoviesContext);

  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const defaultValues = {
    author: "",
    review: "",
    agree: false,
    rating: "3",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSnackClose = (event) => {
    setOpen(false);
    navigate("/movies/favorites");
  };

  const onSubmit = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    context.addReview(movie, review);
    setOpen(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          ✍️ Write a Review
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Share your thoughts about {movie.title}
        </Typography>
      </Box>

      {/* Success Notification */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
        autoHideDuration={3000}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
          elevation={6}
        >
          Thank you for submitting a review! 🎉
        </MuiAlert>
      </Snackbar>

      {/* Form */}
      <Paper elevation={1} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            {/* Author Name */}
            <Box>
              <Controller
                name="author"
                control={control}
                rules={{ required: "Name is required" }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    onChange={onChange}
                    value={value}
                    id="author"
                    label="Your Name"
                    name="author"
                    autoFocus
                    error={!!errors.author}
                    helperText={errors.author?.message}
                  />
                )}
              />
            </Box>

            {/* Rating */}
            <Box>
              <Controller
                control={control}
                name="rating"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="select-rating"
                    select
                    fullWidth
                    variant="outlined"
                    label="Rating"
                    value={rating}
                    onChange={handleRatingChange}
                    helperText="How would you rate this movie?"
                    InputProps={{
                      startAdornment: <StarIcon sx={{ color: "custom.rating", mr: 1 }} />,
                    }}
                  >
                    {ratings.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>

            {/* Review Text */}
            <Box>
              <Controller
                name="review"
                control={control}
                rules={{
                  required: "Review cannot be empty.",
                  minLength: { value: 10, message: "Review must be at least 10 characters" },
                }}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="review"
                    value={value}
                    onChange={onChange}
                    label="Your Review"
                    id="review"
                    multiline
                    minRows={8}
                    error={!!errors.review}
                    helperText={errors.review?.message || "Share your detailed thoughts (minimum 10 characters)"}
                  />
                )}
              />
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Submit Review
              </Button>
              <Button
                type="reset"
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => {
                  reset({
                    author: "",
                    review: "",
                  });
                  setRating(3);
                }}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ReviewForm;
