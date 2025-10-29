import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const MovieCardSkeleton = () => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={<Skeleton variant="text" width="80%" height={32} />}
        sx={{ pb: 1 }}
      />

      <Skeleton
        variant="rectangular"
        height={400}
        sx={{ bgcolor: "action.hover" }}
      />

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={80} />
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={40} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ marginLeft: "auto" }}>
          <Skeleton variant="rounded" width={100} height={36} />
        </Box>
      </CardActions>
    </Card>
  );
};

export default MovieCardSkeleton;

