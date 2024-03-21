import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
function Popular() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  function getMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzczYTVjODAyY2VhM2Q2Y2U3OTAzNDIyOTgyMzQ2ZiIsInN1YiI6IjYzZmViNWFkYzcxNzZkMDA5ZDZlMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTBmIP5R9pWeAzRM3YYhrDOxQrlrUQfhKMjvN3uXU5E",
      },
    };
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovie(response.results);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="mainContainer">
      <div>popularMovies</div>
      <div className={style.card}>
        {movie.map((movie) => (
          <div>
            <div
              className={style.imgDiv}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="movie.title"
              />
            </div>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
