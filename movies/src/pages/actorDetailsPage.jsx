import React from "react";
import { useParams } from "react-router";
import ActorDetails from "../components/actorDetails";
import PageHeader from "../components/pageHeader";
import { usePersonDetails } from "../hooks/usePersonDetails";
import { usePersonMovieCredits } from "../hooks/usePersonMovieCredits";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";

const ActorDetailsPage = () => {
  const { id } = useParams();

  // Fetch actor biographical information
  const { person, PersonState } = usePersonDetails(id, () =>
    getPersonDetails(id)
  );

  // Fetch actor's filmography
  const { movies, FilmographyState } = usePersonMovieCredits(id, () =>
    getPersonMovieCredits(id)
  );

  // Show loading or error state for person details
  const personStateComponent = PersonState();
  if (personStateComponent) return personStateComponent;

  return (
    <>
      <PageHeader title={person.name} />
      <ActorDetails
        person={person}
        movies={movies}
        FilmographyState={FilmographyState}
      />
    </>
  );
};

export default ActorDetailsPage;
