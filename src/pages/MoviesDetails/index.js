import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";

function MoviesDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [mDetails, setmDetails] = useState([]);
  const [mCreditsCast, setMCreditsCast] = useState([]);
  const [mCreditsCrew, setMCreditsCastCrew] = useState([]);
  function getMDetails(movid) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzczYTVjODAyY2VhM2Q2Y2U3OTAzNDIyOTgyMzQ2ZiIsInN1YiI6IjYzZmViNWFkYzcxNzZkMDA5ZDZlMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTBmIP5R9pWeAzRM3YYhrDOxQrlrUQfhKMjvN3uXU5E",
      },
    };
    fetch(`https://api.themoviedb.org/3/movie/${movid}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        setmDetails(response);
      })
      .catch((err) => console.error(err));
  }

  function getMovCredits(movid) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzczYTVjODAyY2VhM2Q2Y2U3OTAzNDIyOTgyMzQ2ZiIsInN1YiI6IjYzZmViNWFkYzcxNzZkMDA5ZDZlMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTBmIP5R9pWeAzRM3YYhrDOxQrlrUQfhKMjvN3uXU5E",
      },
    };
    fetch(
      `https://api.themoviedb.org/3/movie/${movid}/credits?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMCreditsCast(response.cast);
        setMCreditsCastCrew(response.crew);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getMDetails(params.id);
    getMovCredits(params.id);
  }, [params.id]);

  return (
    <div className={style.mainDiv}>
      <div className={style.upperIDiv}>
        <img
          src={`https://image.tmdb.org/t/p/original${mDetails.backdrop_path}`}
          alt="upMov.title"
        />
        <div className={style.posterSec}>
          <div className={style.posterContentContainer}>
            <img
              src={`https://image.tmdb.org/t/p/original${mDetails.poster_path}`}
              alt="upMov.title"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <h4>Movie Name:-</h4>
              <h1>{mDetails.original_title}</h1>

              <div>{mDetails.release_date}</div>
              <h4>OverView</h4>
              <div style={{ lineHeight: "30px" }}>{mDetails.overview}</div>
              <div style={{ display: "flex" }}>
                {mDetails?.genres?.map((mcat) => (
                  <p>{mcat.name} , </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Top Casts</h1>
        <div className={style.castDiv}>
          <div>
            {mCreditsCast.map((mCred) => (
              <section
                className={style.castP}
                onClick={() => navigate(`/credits/${mCred.credit_id}`)}
              >
                <img
                  src={
                    mCred.profile_path
                      ? `https://image.tmdb.org/t/p/original${mCred.profile_path}`
                      : "/avatar.png"
                  }
                  alt="upMov.title"
                />
                <p>Name : {mCred.name}</p>
                <p>Character: {mCred.character}</p>
                <p>known_for_department: {mCred.known_for_department}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h1>Top Crews</h1>

        <div className={style.castDiv}>
          <div>
            {mCreditsCrew.map((mCredCrew) => (
              <section
                className={style.castP}
                onClick={() => navigate(`/credits/${mCredCrew.credit_id}`)}
              >
                <img
                  src={
                    mCredCrew.profile_path
                      ? `https://image.tmdb.org/t/p/original${mCredCrew.profile_path}`
                      : "/avatar.png"
                  }
                  alt="upMov.title"
                />
                <p>Name :{mCredCrew.name}</p>
                <p>job:{mCredCrew.job}</p>
                <p>known_for_department:{mCredCrew.known_for_department}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesDetails;
