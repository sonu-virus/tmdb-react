import React from "react";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Popular from "./pages/movies/Popular";
import Home from "./pages/Home";
import NowPlaying from "./pages/movies/NowPlaying";
import UpComingMovie from "./pages/movies/UpComingMovie";
import TopRated from "./pages/movies/TopRated";
import MoviesDetails from "./pages/MoviesDetails";
import Person from "./pages/movies/Person";
function App() {
  return (
    <div>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/popular" element={<Popular />} />
          <Route path="/movies/now_playing" element={<NowPlaying />} />
          <Route path="/movies/upcoming" element={<UpComingMovie />} />
          <Route path="/movies/top_rated" element={<TopRated />} />
          <Route path="/movie/:id" element={<MoviesDetails />} />
          <Route path="/credits/:id" element={<Person />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
