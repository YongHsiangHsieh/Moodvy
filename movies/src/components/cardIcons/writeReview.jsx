import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router";
import { ROUTES } from "../../constants/routes";

const WriteReviewIcon = ({ movie }) => {
  return (
    <Tooltip title="Write a Review" arrow placement="top">
      <IconButton
        component={Link}
        to={ROUTES.REVIEWS.FORM}
        state={{
          movieId: movie.id,
        }}
        aria-label="write a review"
        sx={{
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.2)",
            color: "secondary.main",
          },
        }}
      >
        <RateReviewIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default WriteReviewIcon;
