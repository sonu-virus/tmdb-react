import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./index.module.css";

function Person() {
  const params = useParams();
  const navigate = useNavigate();
  const [pDetails, setPDetails] = useState([]);
  const [pSDetails, setPSDetails] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzczYTVjODAyY2VhM2Q2Y2U3OTAzNDIyOTgyMzQ2ZiIsInN1YiI6IjYzZmViNWFkYzcxNzZkMDA5ZDZlMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTBmIP5R9pWeAzRM3YYhrDOxQrlrUQfhKMjvN3uXU5E",
    },
  };

  const getPersonDetails = (personId) => {
    fetch(
      `https://api.themoviedb.org/3/person/${personId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setPDetails(response);
      })
      .catch((err) => console.error(err));
  };

  const getSinglePersonDetails = (personId) => {
    fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setPSDetails(response);
      })
      .catch((err) => console.error(err));
  };

  function getCredits(creditId) {
    fetch(
      `https://api.themoviedb.org/3/credit/${creditId}?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        getPersonDetails(response?.person?.id);
        getSinglePersonDetails(response?.person?.id);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getCredits(params.id);
  }, [params.id]);

  return (
    <div className="mainContainer">
      <div className={style.flex}>
        <div className={style.imgDiv}>
          <img
            src={`https://image.tmdb.org/t/p/original${pDetails.profile_path}`}
          />
        </div>
        <div className={style.rightText}>
          <h1>{pDetails.name}</h1>
          <h2>Biography</h2>
          <p>{pDetails.biography}</p>
          <h2>BirthPlace</h2>
          <p>{pDetails.place_of_birth}</p>
          <h2>Known_for_Department</h2>
          <p>{pDetails.known_for_department}</p>
        </div>
      </div>
      <div className={style.spDiv}>
        {pSDetails?.cast?.map((sPDet) => (
          <>
            {sPDet?.backdrop_path && (
              <div
                className={style.spCard}
                onClick={() => navigate(`/movie/${sPDet.id}`)}
              >
                <div>
                  {console.log(sPDet.id)}
                  <img
                    src={`https://image.tmdb.org/t/p/original${sPDet.backdrop_path}`}
                    alt=""
                  />
                </div>
                <div>
                  <h3>{sPDet.character}</h3>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default Person;
