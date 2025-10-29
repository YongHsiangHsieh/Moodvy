import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router";
import { ROUTES } from "../../constants/routes";

const WriteReviewIcon = ({ movie }) => {
  return (
    <Link
      to={ROUTES.REVIEWS.FORM}
      state={{
        movieId: movie.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
