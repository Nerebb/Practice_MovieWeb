import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Collapse, Fade, useScrollTrigger } from "@mui/material";
import NavTabs from "../components/NavTab";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import GenresFilter from "../components/GenresFilter";
import SearchInput from "../components/SearchInput";
import useDevice from "../hooks/useDevice";
import SideMenu from "../components/SideMenu";

const HomeTab = [
  { label: "Discover", href: "/" },
  { label: "Movie", href: "/movie" },
  { label: "Tv Series", href: "/tv" },
  { label: "Playlist", href: "/Playlist" },
];

export default function SearchAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = useParams();
  const isMobile = useDevice(450);
  const [isSearch, setIsSearch] = React.useState(false);
  const scrollTrigger = useScrollTrigger({
    threshold: 0,
  });

  const handleFade =
    location.pathname === "/"
      ? scrollTrigger
      : urlParams.keyword ||
        (HomeTab.some((i, idx) => i.href === `/${urlParams.category}`) &&
          !urlParams.id);
  return (
    <Box sx={{ position: "fixed", top: 0, width: 1, zIndex: 10 }}>
      <AppBar
        position="relative"
        sx={{
          background: "transparent",
          backgroundColor: handleFade
            ? (theme) => theme.palette.background.default
            : "transparent",
          color: (theme) =>
            scrollTrigger ? theme.palette.primary : theme.palette.secondary,
          transition: scrollTrigger ? "0.3s" : "0.5s",
          boxShadow: "none",
          paddingX: { xs: "0", md: 1 },
        }}
      >
        <Toolbar>
          <SideMenu />
          <Box
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer", fontWeight: "bold" }}
            >
              NEREB
            </Typography>
          </Box>
          {!isMobile && (
            <Fade in={handleFade}>
              <Box>
                <SearchInput setIsSearch={setIsSearch} />
              </Box>
            </Fade>
          )}
          <NavTabs data={HomeTab} />
        </Toolbar>
      </AppBar>
      {!isMobile && (
        <Fade in={handleFade}>
          <Box>
            <Collapse in={isSearch || location.pathname !== "/"}>
              <GenresFilter />
            </Collapse>
          </Box>
        </Fade>
      )}
    </Box>
  );
}
