import React from "react";
import CardList from "../components/CardList";
import { Form } from "react-bootstrap";

const Home = ({
  movies,
  moviesFiltered,
  initMovies,
  categories,
  setMovies,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [translateValue, setTranslateValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemPerPage = 12;

  // Logic for displaying current items
  const indexOfLastTodo = currentPage * itemPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
  const currentMovies = movies.slice(indexOfFirstTodo, indexOfLastTodo);

  const onChangeCategory = (e) => {
    let category = e.target.value;
    if (category === "Tous") {
      setMovies(initMovies);
    } else {
      setMovies(moviesFiltered.filter((m) => m.Category === category));
    }
  };

  const LeftArrow = () => {
    return (
      currentPage > 1 && (
        <div className="backArrow arrow" onClick={onPreviousArrow}>
          <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
        </div>
      )
    );
  };

  const RightArrow = () => {
    return (
      indexOfLastTodo < movies.length && (
        <div className="nextArrow arrow" onClick={onNextArrow}>
          <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
        </div>
      )
    );
  };

  const onNextArrow = () => {
    setCurrentIndex(currentIndex + 1);
    setCurrentPage(currentPage + 1);
  };

  const onPreviousArrow = () => {
    setCurrentIndex(currentIndex - 1);
    setCurrentPage(currentPage - 1);
  };

  if (movies.length > 0) {
    return (
      <div className="home">
        <div className="container">
          <div className="home-header">
            <p className="display-4">Top 1000 Movies</p>
            <div className="col-2">
              <Form.Control as="select" onChange={(e) => onChangeCategory(e)}>
                <option selected value="Tous">
                  Tous
                </option>
                {categories.map((c, i) => (
                  <option value={c.Category} key={c.i}>
                    {c.Category}
                  </option>
                ))}
              </Form.Control>
            </div>
          </div>
          <div className="slider">
            <div
              className="slider-wrapper row"
              style={{
                transform: `translateX(${translateValue}px)`,
                transition: "transform ease-out 0.45s",
              }}
            >
              <div className="buttons">
                <LeftArrow />
              </div>
              <CardList movies={currentMovies} />
              <div className="buttons">
                <RightArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loader">
        <img src="./loader.gif" className="loader-img" />
      </div>
    );
  }
};

export default Home;
