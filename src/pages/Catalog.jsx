import { Grid, Pagination, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tmdbApi, { movieType, tvType } from "../api/tmdbApi";
import MovieCard from "../components/MovieCard";
import useDevice from "../hooks/useDevice";

function Catalog() {
  const { category, keyword } = useParams();
  const [items, setItems] = useState([]);
  const isMobile = useDevice(450);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (keyword === undefined) {
        const params = {};
        switch (category) {
          case "movie":
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
            break;
        }
      } else {
        const params = { query: keyword };
        response = await tmdbApi.search(category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    fetchData();
  }, [category, keyword]);

  const handlePagination = async (e, curPage) => {
    let response;

    if (keyword === undefined) {
      const params = { page: curPage };
      switch (category) {
        case "movie":
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
          break;
      }
    } else {
      const params = { page: curPage, query: keyword };
      response = await tmdbApi.search(category, { params });
    }
    setItems(response.results);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Stack
      m="auto"
      display="flex"
      alignItems={"center"}
      spacing={5}
      mb={5}
      px={{ xs: 5 }}
    >
      <Grid
        container
        spacing={5}
        mt={{ xs: 5, sm: 25, md: 20 }}
        justifyContent={{ xs: "center", sm: "flex-start" }}
        maxWidth={{ sm: 720, md: 1400 }}
      >
        {items.map(
          (item, idx) =>
            idx !== 0 && (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard category={category} item={item} />
              </Grid>
            )
        )}
      </Grid>
      {totalPage > 1 && (
        <Pagination
          count={totalPage}
          size={isMobile ? "medium" : "large"}
          onChange={(e, curPage) => handlePagination(e, curPage)}
          siblingCount={isMobile ? 0 : 1}
          sx={{
            maxWidth: { xs: "350px", sm: 1 },
          }}
        />
      )}
    </Stack>
  );
}

export default Catalog;
