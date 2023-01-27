import React, { useState, useEffect } from "react";
import { PlaylistContext } from ".";

function PlayListProvider({ children }) {
  const [playList, setPlayList] = useState([]);
  
  useEffect(() => {
    const localStore = localStorage;
    const res = Object.entries(localStore);
    const movies = res.map((i) => JSON.parse(i[1]));
    setPlayList(movies);
  }, [setPlayList]);

  return (
    <PlaylistContext.Provider value={{ playList, setPlayList }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export default PlayListProvider;
