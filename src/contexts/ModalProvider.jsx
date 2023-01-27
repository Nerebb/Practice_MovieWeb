import React, { useState, useEffect } from "react";
import { ModalContext } from ".";
import tmdbApi, { category } from "../api/tmdbApi";

function ModalProvider({ children }) {
  const [isModal, setIsModal] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [videoUrl, setVideoUrl] = useState("No trailer found");

  useEffect(() => {
    async function fetchData() {
      const res = await tmdbApi.getVideos(category.movie, videoId);
      if (res.results.length > 0) {
        setVideoUrl("https://www.youtube.com/embed/" + res.results[0].key);
      } else {
        setVideoUrl("No trailer found");
      }
    }
    if (videoId) fetchData();
  }, [videoId]);

  return (
    <ModalContext.Provider
      value={{ isModal, setIsModal, videoId, videoUrl, setVideoId }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
