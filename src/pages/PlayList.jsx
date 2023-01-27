import { Grid } from "@mui/material";
import React, { useContext } from "react";
import MovieCard from "../components/MovieCard";
import { PlaylistContext } from "../contexts";

function PlayList() {
  const { playList } = useContext(PlaylistContext);
  return (
    <Grid
      container
      spacing={5}
      mt={5}
      justifyContent={{ xs: "center", sm: "flex-start" }}
      maxWidth={{ sm: 720, md: 1400 }}
    >
      {playList.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
          <MovieCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PlayList;
