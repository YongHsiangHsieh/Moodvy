import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { ROUTES } from "./constants/routes";
import theme from "./theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path={ROUTES.MOVIES.FAVORITES} element={<FavoriteMoviesPage />} />
              <Route path={ROUTES.MOVIES.UPCOMING} element={<UpcomingMoviesPage />} />
              <Route path={ROUTES.REVIEWS.VIEW} element={<MovieReviewPage />} />
              <Route path={ROUTES.MOVIES.DETAILS} element={<MoviePage />} />
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.REVIEWS.FORM} element={<AddMovieReviewPage />} />
              <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
