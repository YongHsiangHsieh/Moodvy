import React, { useState } from "react";
import { createCollectionHandlers } from "../utils/collections";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [myReviews, setMyReviews] = useState({});

  // Create handlers for favorites collection
  const favoritesHandlers = createCollectionHandlers(favorites, setFavorites);

  // Create handlers for must-watch collection
  const mustWatchHandlers = createCollectionHandlers(mustWatch, setMustWatch);

  // Review management (different pattern - uses object with movie IDs as keys)
  const addReview = (movie, review) => {
    setMyReviews((prev) => ({
      ...prev,
      [movie.id]: review,
    }));
  };

  return (
    <MoviesContext.Provider
      value={{
        // Favorites
        favorites,
        addToFavorites: favoritesHandlers.add,
        removeFromFavorites: favoritesHandlers.remove,
        
        // Must Watch
        mustWatch,
        addToMustWatch: mustWatchHandlers.add,
        
        // Reviews
        addReview,
        myReviews,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
