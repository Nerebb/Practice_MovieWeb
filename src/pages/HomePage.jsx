import React from "react";
import apiConfig from "../api/apiConfig";
import { category, movieType } from "../api/tmdbApi";
import MainBanner from "../components/MainBanner";
import Section from "../layouts/Section";
// const axiosClient = axios.create({})
function HomePage() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiConfig.test());
        console.log(res);
      } catch (error) {
        console.log("🚀 ~ file: HomePage.jsx:14 ~ fetchData ~ error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="scrollbar">
      <MainBanner />
      <Section
        title={"Trending Movies"}
        category={category.movie}
        type={movieType.popular}
      />
      <Section
        title={"Top Rated Movies"}
        category={category.movie}
        type={movieType.top_rated}
      />
      <Section
        title={"Trending TV"}
        category={category.tv}
        type={movieType.popular}
      />
      <Section
        title={"Top Rated TV"}
        category={category.tv}
        type={movieType.top_rated}
      />
    </div>
  );
}

export default HomePage;
