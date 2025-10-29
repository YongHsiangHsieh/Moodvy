import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
  };

  return (
    <Tooltip title="Add to Favorites" arrow placement="top">
      <IconButton
        aria-label="add to favorites"
        onClick={handleAddToFavorites}
        sx={{
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.2)",
            color: "custom.favorite",
          },
        }}
      >
        <FavoriteIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToFavoritesIcon;
