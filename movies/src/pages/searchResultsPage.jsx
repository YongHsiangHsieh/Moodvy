import React from "react";
import { useSearchParams } from "react-router";
import { useSearch } from "../hooks/useSearch";
import PageHeader from "../components/pageHeader";
import MovieCard from "../components/movieCard";
import CastCard from "../components/castCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { movies, people, SearchState } = useSearch(query);

  const stateComponent = SearchState();
  if (stateComponent) return stateComponent;

  if (!query) {
    return (
      <Grid container>
        <Grid size={12}>
          <PageHeader title="Search Results" />
        </Grid>
        <Grid size={12}>
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Please enter a search query
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  const hasResults = movies.length > 0 || people.length > 0;
  if (!hasResults) {
    return (
      <Grid container>
        <Grid size={12}>
          <PageHeader title={`Search Results for "${query}"`} />
        </Grid>
        <Grid size={12}>
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No results found for "{query}"
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try searching with different keywords
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader title={`Search Results for "${query}"`} />
      </Grid>

      {movies.length > 0 && (
        <Grid size={12} sx={{ p: { xs: 2, md: 2.5 } }}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            Movies ({movies.length})
          </Typography>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <MovieCard
                  movie={movie}
                  action={(movie) => <AddToFavoritesIcon movie={movie} />}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      {people.length > 0 && (
        <Grid size={12} sx={{ p: { xs: 2, md: 2.5 } }}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            People ({people.length})
          </Typography>
          <Grid container spacing={2}>
            {people.map((person) => (
              <Grid key={person.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                <CastCard actor={person} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SearchResultsPage;
