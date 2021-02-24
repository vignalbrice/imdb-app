import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Dashboard from "../views/Dashboard";
import Details from "../views/Details";
import Home from "../views/Home";
import axios from "axios";
import constants from "../constants/constants";

export default function Router() {
  const [movies, setMovies] = React.useState([]);
  const [moviesFiltered, setMoviesFiltered] = React.useState([]);
  const [initMovies, setInitMovies] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .all(
        [
          axios.get(`${constants.api_url}/crew/movies`),
          axios.get(`${constants.api_url}/crew/movies/category`),
        ],
        {
          headers: {
            Authorization: `${constants.api_key}`,
          },
        }
      )
      .then((response) => {
        setMovies(response[0].data);
        setInitMovies(response[0].data);
        setMoviesFiltered(response[0].data);
        setCategories(response[1].data);
      });
  };

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home
            movies={movies}
            initMovies={initMovies}
            categories={categories}
            moviesFiltered={moviesFiltered}
            setMovies={setMovies}
          />
        </Route>
        <Route path="/detail/:id">
          <Details movies={movies} />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
