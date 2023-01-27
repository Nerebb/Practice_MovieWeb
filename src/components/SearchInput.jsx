import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { SearchContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { category } from "../api/tmdbApi";
import useDevice from "../hooks/useDevice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

function SearchInput({ setIsSearch }) {
  const navigate = useNavigate();
  const isMobile = useDevice(450);
  const { searchParams, setSearchParams } = React.useContext(SearchContext);
  function handleSearchInput(e) {
    if (e.key === "Enter") {
      navigate(`/${category.movie}/search/${searchParams}`);
      setSearchParams("");
    }
  }

  return (
    <Search sx={{ mr: 2 }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search movie…"
        inputProps={{ "aria-label": "search" }}
        value={searchParams}
        onFocus={() => (!isMobile ? setIsSearch(true) : "")}
        onBlur={() => (!isMobile ? setIsSearch(false) : "")}
        onChange={(e) => setSearchParams(e.target.value)}
        onKeyDown={(e) => handleSearchInput(e)}
      />
    </Search>
  );
}

export default SearchInput;
