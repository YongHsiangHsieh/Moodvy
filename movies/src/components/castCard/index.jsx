import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router";
import { getActorRoute } from "../../constants/routes";
import { getActorProfileUrl } from "../../utils/movie";

const CastCard = ({ actor }) => {
  const profileImageUrl = getActorProfileUrl(actor.profile_path);

  return (
    <Link to={getActorRoute(actor.id)} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          minWidth: 140,
          maxWidth: 140,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 4,
          },
        }}
      >
        {/* Actor Photo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
            pb: 1,
          }}
        >
          {profileImageUrl ? (
            <Avatar
              src={profileImageUrl}
              alt={actor.name}
              sx={{
                width: 100,
                height: 100,
                border: "2px solid",
                borderColor: "primary.main",
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "action.hover",
                border: "2px solid",
                borderColor: "divider",
              }}
            >
              <PersonIcon sx={{ fontSize: 60, color: "action.active" }} />
            </Avatar>
          )}
        </Box>

        {/* Actor Info */}
        <CardContent sx={{ pt: 1, pb: 2, px: 1.5 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            align="center"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "2.4em",
              mb: 0.5,
            }}
          >
            {actor.name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            sx={{
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {actor.character || "Unknown Role"}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CastCard;
