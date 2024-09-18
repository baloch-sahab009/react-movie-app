import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
          <div className="cards">
            <img
              className="cards__img"
              src={movie ? movie.thumbnail : ""}  // Adjusted to use your API thumbnail
              alt={movie ? movie.title : "Movie Poster"}
            />
            <div className="cards__overlay">
              <div className="card__title">{movie ? movie.title : ""}</div>
              <div className="card__runtime">
                {movie ? movie.release_date : ""}
                <span className="card__rating">
                  {movie ? movie.vote_average : ""}
                  <i className="fas fa-star" />
                </span>
              </div>
              {/* Safely check if overview exists before calling slice */}
              <div className="card__description">
                {movie && movie.description ? movie.description.slice(0, 118) + "..." : "No description available"}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
