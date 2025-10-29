import React from "react";
import Grid from "@mui/material/Grid";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieListSkeleton = ({ count = 8 }) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <MovieCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieListSkeleton;

