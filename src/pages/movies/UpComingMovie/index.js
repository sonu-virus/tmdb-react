import React, { useEffect, useState } from "react";
import style from "./index.module.css";

function UpComingMovie() {
  const [uPMovies, setUpMovies] = useState([]);

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
          <div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/original${upMov.backdrop_path}`}
                alt="upMov.title"
              />
            </div>

            <h3>{upMov.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UpComingMovie;
