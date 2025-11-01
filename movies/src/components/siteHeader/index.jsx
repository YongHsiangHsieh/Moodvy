import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ROUTES, getSearchRoute } from "../../constants/routes";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: ROUTES.HOME },
    { label: "Favorites", path: ROUTES.MOVIES.FAVORITES },
    { label: "Upcoming", path: ROUTES.MOVIES.UPCOMING },
    { label: "Popular", path: ROUTES.MOVIES.POPULAR },
    { label: "Top Rated", path: ROUTES.MOVIES.TOP_RATED },
    { label: "In Theaters", path: ROUTES.MOVIES.NOW_PLAYING },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(getSearchRoute(searchQuery.trim()));
      setSearchQuery("");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        elevation={2}
        sx={{
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            🎬 Moodvy
          </Typography>
          <Typography
            variant="body2"
            sx={{
              ml: 3,
              display: { xs: "none", md: "block" },
              opacity: 0.9,
            }}
          >
            Discover Your Next Favorite Movie
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              ml: 3,
              display: { xs: "none", md: "block" },
            }}
          >
            <TextField
              size="small"
              placeholder="Search movies or actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                "aria-label": "Search movies or actors",
              }}
              sx={{
                width: 250,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.7)",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                  opacity: 1,
                },
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {isMobile ? (
            <>
              <IconButton
                aria-label="Open navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                aria-expanded={open ? "true" : "false"}
                onClick={handleMenu}
                color="inherit"
                size="large"
                sx={{ minWidth: 48, minHeight: 48 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  aria-label={`Navigate to ${opt.label}`}
                  sx={{ minHeight: 48, px: 2 }}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
