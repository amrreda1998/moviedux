import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import WatchList from "./components/WatchList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  //stateful component that is required to be passed as children props
  const [movies, setMovies] = useState([]); //movieslist states
  const [watchlist, setWatchList] = useState([]); //list of movies that you want to watch

  useEffect(() => {
    //fetch the movies data and update the state of the movies list
    fetch("movies.json")
      .then((response) => response.json()) //return  a list of  objects from json
      .then((data) => setMovies(data)); // update the state of movies list
  }, []);

  // function to toggleWatchMovie
  // this function updates the state of  watchlist of movies
  const watchMovieToggle = (movieId) => {
    setWatchList(
      (prev) =>
        prev.includes(movieId)
          ? prev.filter(
              //return every movie that does not have the movie id
              (id) => id !== movieId
            )
          : [...prev, movieId] //movies.find((movie) => movie.id === movieId ??????
    );
  };

  return (
    <div className="App">
      {/* header component */}
      <Header></Header>

      {/* Router component to navigate between screens */}
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/watchlist">WatchList</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <MoviesGrid
                movies={movies}
                toggleWatchList={watchMovieToggle}
                WatchList={watchlist}
              ></MoviesGrid>
            }
          ></Route>
          <Route
            path="/watchlist"
            element={
              <WatchList
                movies={movies}
                toggleWatchList={watchMovieToggle}
                WatchMovieList={watchlist}
              ></WatchList>
            }
          ></Route>
        </Routes>
      </Router>

      {/* Footer component */}
      <Footer></Footer>
    </div>
  );
}

export default App;
