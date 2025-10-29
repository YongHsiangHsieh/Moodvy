import React from "react";
import { useParams } from "react-router";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api";
import { useMovieById } from "../hooks/useMovieById.jsx";

const MoviePage = () => {
  const { id } = useParams();
  const { movie, MovieState } = useMovieById(id, getMovie);

  // Show loading or error state if needed
  const stateComponent = MovieState();
  if (stateComponent) return stateComponent;

  return (
    <PageTemplate movie={movie}>
      <MovieDetails movie={movie} />
    </PageTemplate>
  );
};

export default MoviePage;
