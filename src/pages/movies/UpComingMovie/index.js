import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";

function UpComingMovie() {
  const [uPMovies, setUpMovies] = useState([]);
  const navigate = useNavigate();

  function getUpComingMovie() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzczYTVjODAyY2VhM2Q2Y2U3OTAzNDIyOTgyMzQ2ZiIsInN1YiI6IjYzZmViNWFkYzcxNzZkMDA5ZDZlMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTBmIP5R9pWeAzRM3YYhrDOxQrlrUQfhKMjvN3uXU5E",
      },
    };
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setUpMovies(response.results);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getUpComingMovie();
  }, []);
  return (
    <div className="mainContainer">
      <div className={style.card}>
        {uPMovies.map((upMov) => (
          <div onClick={() => navigate(`/movie/${upMov.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/original${upMov.backdrop_path}`}
              alt="upMov.title"
            />

            <h3>{upMov.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UpComingMovie;
