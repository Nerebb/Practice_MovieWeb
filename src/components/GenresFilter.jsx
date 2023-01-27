import { Box, FormControlLabel, FormGroup, Grid } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { category as srcCate } from "../api/tmdbApi";
import { SearchContext } from "../contexts";
import CusCheckbox from "./CusCheckbox";

function GenresFilter() {
  const {
    tvGenres,
    movieGenres,
    setSearchParams,
    checkedGenres,
    setCheckedGenres,
  } = useContext(SearchContext);
  const { category } = useParams();
  const navigate = useNavigate();

  function handleGenres(e, id) {
    let checkBoxes = [...checkedGenres];
    if (e.target.checked && !checkedGenres.includes(id)) {
      checkBoxes.push(id);
    } else if (!e.target.checked) {
      checkBoxes = checkBoxes.filter((i) => i !== id);
    }
    setCheckedGenres(checkBoxes);

    const genresParams = checkBoxes.join("&");
    if (!genresParams) {
      setSearchParams("");
      return navigate(`/${category}`);
    } else {
      setSearchParams("");
      return navigate(`/${category}/search/${genresParams}`);
    }
  }

  const renderGenres = () => {
    let genres = [];
    switch (category) {
      case srcCate.movie:
        genres = [...movieGenres];
        break;
      case srcCate.tv:
        genres = [...tvGenres];
        break;
      default:
        break;
    }
    return (
      <FormGroup>
        <Grid container>
          {genres?.map((i) => (
            <Grid key={i.id} item sm={3} md={2}>
              <FormControlLabel
                control={
                  <CusCheckbox
                    checked={checkedGenres.some((id) => id === i.id)}
                  />
                }
                label={i.name}
                onClick={(e) => handleGenres(e, i.id)}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    );
  };

  return (
    <Box
      width={1}
      sx={{
        px: 5,
        m: "auto",
        background: (theme) => theme.palette.background.default,
      }}
    >
      {renderGenres()}
    </Box>
  );
}

export default GenresFilter;
