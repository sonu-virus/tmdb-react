import React from "react";
import style from "./index.module.css";

function Header() {
  return (
    <header>
      <div className={`mainContainer ${style.header}`}>
        <div className={style.flex}>
          <div className={style.home}>
            <a href="/">Home</a>
          </div>
          <div className={style.dropdown}>
            <p>Movies</p>
            <div className={style.dropdownElements}>
              <a href="/movies/popular">Popular</a>
              <a href="/movies/now_playing">Now Playing</a>
              <a href="/movies/upcoming">Upcoming</a>
              <a href="/movies/top_rated">TopRated</a>
            </div>
          </div>
          <div>Tv shows</div>
          <div>Peaple</div>
        </div>
        <div className={style.flex}>
          <div>+</div>
          <div>EN</div>
          <div>Login </div>
          <div>Join TMDB</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
