import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";

function TopRated() {
  const [topMovie, setTopMovie] = useState([]);
  const navigate = useNavigate();

  function getTopRMovie() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzczYTVjODAyY2VhM2Q2Y2U3OTAzNDIyOTgyMzQ2ZiIsInN1YiI6IjYzZmViNWFkYzcxNzZkMDA5ZDZlMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTBmIP5R9pWeAzRM3YYhrDOxQrlrUQfhKMjvN3uXU5E",
      },
    };
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTopMovie(response.results);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getTopRMovie();
  }, []);

  return (
    <div className="mainContener">
      <div className={style.card}>
        {topMovie.map((topMovie) => (
          <div
            className={style.imgDiv}
            onClick={() => navigate(`/movie/${topMovie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`}
              alt="upMov.title"
            />

            <div className={style.hide}>
              <h3>{topMovie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRated;
