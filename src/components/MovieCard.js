import React from "react";
import "../styles.css";

export default function MovieCard({ movie, isWatchListed, toggleWatchList }) {
  // image src file error handeling
  const ImageErrorHandeler = (e) => {
    e.target.src = "images/default.jpg";
  };

  //function to add colorClasses based on the rating
  const getRatingClass = (rating) => {
    if (rating >= 8) {
      return "rating-good";
    } else if (rating >= 5 && rating < 8) {
      return "rating-ok";
    } else {
      return "rating-bad";
    }
  };

  return (
    <div id={movie.id} className="movie-card">
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={ImageErrorHandeler}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={isWatchListed}
            onChange={()=>toggleWatchList(movie.id)} ///??? ()=> toggleWatchlist()
          ></input>
          <span className="slider">
            <span className="slider-label">
              {isWatchListed ? "in watchList" : "add to watchlist"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
