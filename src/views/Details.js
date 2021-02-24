import React from "react";
import { useParams } from "react-router-dom";

const Details = ({ movies }) => {
  const { id } = useParams();
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return movies
    .filter((m) => m.Rank === Number(id))
    .map((d) => {
      console.log(d.Rank / 2, d.Rank);
      const stars = [0, 1, 2, 3, 4].map((star, index) => {
        const color = index < d.Rank / 2 ? "#FFC107" : "#E4E5E9";
        return (
          <span
            key={index}
            style={{ color: color, fontSize: 20, cursor: "pointer" }}
          >
            &#9733;
          </span>
        );
      });
      return (
        <div className="container-fluid px-5 pt-5">
          <div className="details">
            <div className="detail-image">
              <img src={d.Image} alt="image" />
            </div>
            <div className="detail-content">
              <p className="h3">
                {d.Title} ({d.Year})
              </p>
              <p className="h5">{d.Duration} min</p>
              {stars}
              <p className="detail-category">{d.Category}</p>
              <p className="detail-votes">
                More than {numberWithCommas(d.Votes_number)} votes
              </p>
            </div>
          </div>
        </div>
      );
    });
};

export default Details;
