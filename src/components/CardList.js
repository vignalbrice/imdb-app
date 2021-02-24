import React from "react";
import CardItem from "./CardItem";
const Card = ({ movies }) => {
  return movies.map((item, index) => (
    <div className="slider" key={index}>
      <CardItem movie={item} />
    </div>
  ));
};

export default Card;
