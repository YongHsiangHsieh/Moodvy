import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import { QUERY_KEYS } from "../constants/queryKeys";

/**
 * Custom hook for fetching actor/person details by ID with loading and error states
 *
 * @param {string|number} personId - The person/actor ID
 * @param {Function} queryFn - The function to fetch the person details
 * @returns {Object} { person, isLoading, error, PersonState }
 */
export const usePersonDetails = (personId, queryFn) => {
  const {
    data: person,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.PERSON(personId),
    queryFn: queryFn,
  });

  // Component to render loading/error states
  const PersonState = () => {
    if (isPending) {
      return (
        <Box sx={{ p: 3 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            {/* Actor name skeleton */}
            <Skeleton variant="text" width="50%" height={60} sx={{ mb: 2 }} />

            {/* Profile photo skeleton */}
            <Skeleton
              variant="rectangular"
              width={300}
              height={450}
              sx={{ mb: 3, borderRadius: 2 }}
            />

            {/* Biography skeleton */}
            <Skeleton variant="text" width="30%" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="95%" height={20} />
            <Skeleton variant="text" width="98%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />

            {/* Additional info skeleton */}
            <Box sx={{ mt: 3, display: "flex", gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton variant="text" width="70%" height={20} />
              </Box>
            </Box>
          </Paper>
        </Box>
      );
    }

    if (isError) {
      return (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" color="error">
            {error.message}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return {
    person,
    isLoading: isPending,
    error: isError ? error : null,
    PersonState,
  };
};
