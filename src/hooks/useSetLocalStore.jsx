import React, { useState, useEffect } from "react";

function useSetLocalStore(movie) {
  const [item, setItem] = useState(false);
  useEffect(() => {
    localStorage.setItem(movie.id, JSON.stringify(movie));
    setItem(true);
  }, [movie]);
  return item;
}

export default useSetLocalStore;
