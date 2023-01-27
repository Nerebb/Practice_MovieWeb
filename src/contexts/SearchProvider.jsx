import { SearchContext } from ".";
import React, { useState, useEffect } from "react";
import tmdbApi, { category as srcCate } from "../api/tmdbApi";

function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState("");
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const movie = await tmdbApi.genres(srcCate.movie);
      const tv = await tmdbApi.genres(srcCate.tv);
      setMovieGenres(movie.genres);
      setTvGenres(tv.genres);
    };
    fetchGenres();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        setSearchParams,
        movieGenres,
        tvGenres,
        checkedGenres,
        setCheckedGenres,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
