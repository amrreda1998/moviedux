import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";


export default function MoviesGrid({ movies, toggleWatchList, WatchList }) {
  //intialize the state of the list of movies and hook a function to the object to update it
  //as it changes

  //APP states

  const [searchItem, setSearchItem] = useState(""); //search item state
  const [genreFilterstate, setGenreFilterState] = useState("All Genres"); //genre filter state
  const [ratingFilterState, setRatingFilterState] = useState("All Ratings"); //rating filter state

  //Searching bar Logic
  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  //filter functions
  //filter by searching names funciton

  const matchesSearchTerm = (movie, searchItem) =>
    movie.title.toLowerCase().includes(searchItem.toLowerCase());
  const matchesGenre = (movie, genre) =>
    genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();
  const matchesRating = (movie, rating) =>
    rating === "All Ratings" ||
    rating.toLowerCase() === getRatingString(movie.rating).toLowerCase();

  //function to attach every rating value with its string value
  const getRatingString = (rating) => {
    if (rating >= 8) {
      return "Good";
    } else if (rating >= 5 && rating < 8) {
      return "ok";
    } else {
      return "bad";
    }
  };

  var filteredMovies = movies.filter(
    (movie) =>
      matchesSearchTerm(movie, searchItem) &&
      matchesGenre(movie, genreFilterstate) &&
      matchesRating(movie, ratingFilterState)
  );

  //filter bar logic
  const handleGenreChange = (e) => {
    //update the genre state
    setGenreFilterState(e.target.value);
  };

  const handleRatingChange = (e) => {
    //update the genre state
    setRatingFilterState(e.target.value);
  };

  return (
    <div className="container">
      {/* Search bar */}
      <input
        type="text"
        className="search-input"
        placeholder="Search movies"
        value={searchItem}
        onChange={handleSearchChange}
      ></input>

      {/* filter bar */}
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genreFilterstate}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={ratingFilterState}
            onChange={handleRatingChange}
          >
            <option>All Ratings</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            isWatchListed={WatchList.includes(movie.id)}
            toggleWatchList ={toggleWatchList}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
}
