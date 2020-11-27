import React from "react";
import { useHistory } from "react-router-dom";

const CardItem = ({ movie }) => {
  const history = useHistory();

  return (
    <div
      className="row mx-2 mb-2"
      onClick={() => history.push(`/detail/${movie.Rank}`)}
    >
      <div className="card card-movie">
        <div className="card-rank">{movie.Rank}</div>
        <div className="card-image">
          <img src={movie.Image} />
        </div>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
