import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router";
import { getMovie } from "../api/tmdb-api";
import { useMovieById } from "../hooks/useMovieById.jsx";

const WriteReviewPage = () => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const { movie, MovieState } = useMovieById(movieId, getMovie);

  // Show loading or error state if needed
  const stateComponent = MovieState();
  if (stateComponent) return stateComponent;

  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
};

export default WriteReviewPage;
