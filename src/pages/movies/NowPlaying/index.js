import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";

function NowPlaying() {
  const navigate = useNavigate();
  const [nowPlaying, setNowPlaying] = useState([]);

  function getNowPlayingMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzczYTVjODAyY2VhM2Q2Y2U3OTAzNDIyOTgyMzQ2ZiIsInN1YiI6IjYzZmViNWFkYzcxNzZkMDA5ZDZlMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTBmIP5R9pWeAzRM3YYhrDOxQrlrUQfhKMjvN3uXU5E",
      },
    };
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setNowPlaying(response.results);
        console.log(response.results);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return (
    <div>
      <div className="mainContainer">
        <h2>NowPlaying Page</h2>
        <div className={style.card}>
          {nowPlaying.map((nMovies) => (
            <div onClick={() => navigate(`/movie/${nMovies.id}`)}>
              <img
                src={`https://image.tmdb.org/t/p/original${nMovies.backdrop_path}`}
                alt="movie.title"
              />
              <h4>{nMovies.title}</h4>
              <h4>{nMovies.release_date}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NowPlaying;
