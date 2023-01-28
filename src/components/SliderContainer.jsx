import React, { useEffect, useState } from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MovieCard from "./MovieCard";
import tmdbApi, { category } from "../api/tmdbApi";

function SliderContainer({ ...props }) {
  const [listedMovie, setListedMovie] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setListedMovie(response.results);
    };
    getList();
  }, []);

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      breakpoints={{
        // when window width is >= 640px
        640: {
          width: 640,
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        900: {
          spaceBetween: 50,
          slidesPerView: 4,
        },
        1250: {
          slidesPerView: 5,
        },
      }}
    >
      {listedMovie.map((item) => (
        <SwiperSlide key={item.id}>
          <MovieCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SliderContainer;
