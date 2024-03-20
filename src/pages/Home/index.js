import React, { useEffect, useState } from "react";

function Home() {
  const [mImg, setMImg] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const preBtn = () =>
    currentIndex > 0
      ? setCurrentIndex((prevIndex) => prevIndex - 1)
      : setCurrentIndex(mImg.length - 1);

  const NextBtn = () =>
    currentIndex >= mImg.length - 2
      ? setCurrentIndex(0)
      : setCurrentIndex((prevIndex) => prevIndex + 1);

  function getMImg() {
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
        setMImg(response.results);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getMImg();

    const caroInterval = setInterval(() => {
      if (mImg.length > 0) {
        NextBtn();
      }
    }, 5000);
    return () => clearInterval(caroInterval);
  }, []);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  return (
    <div>
      {mImg.length > 0 && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${mImg[currentIndex].backdrop_path}`}
          />
        </div>
      )}
      <button onClick={preBtn}>pre</button>
      <button onClick={NextBtn}>pre</button>
    </div>
  );
}

export default Home;
