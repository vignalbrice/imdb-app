import axios from "axios";
import React from "react";
import constants from "../constants/constants";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const Dashboard = () => {
  const [grosses, setGrosses] = React.useState([]);
  const [ratings, setRatings] = React.useState([]);
  const [duration, setDuration] = React.useState([]);

  React.useEffect(() => {
    axios
      .all([
        axios.get(`${constants.api_url}/crew/movies/gross`),
        axios.get(`${constants.api_url}/crew/movies/rating`),
        axios.get(`${constants.api_url}/crew/movies/duration`),
      ])
      .then((response) => {
        setGrosses(response[0].data);
        setRatings(response[1].data);
        setDuration(response[2].data);
        console.log(response[2].data.map((d) => d.Duration));
      });
  }, []);
  return (
    <div className="dashboard container">
      <p className="display-4">Dashboard</p>
      <HighchartsReact
        options={{
          xAxis: {
            categories: ratings.map((r) => r.Title),
          },
          yAxis: {
            title: {
              text: "Rating",
            },
          },
          chart: {
            type: "bar",
          },
          series: [
            {
              type: "column",
              name: "Ratings",
              data: ratings.map((r) => r.Rating),
            },
          ],
          title: {
            text: "10 rank movies",
          },
        }}
        highcharts={Highcharts}
      />

      <HighchartsReact
        options={{
          xAxis: {
            categories: grosses.map((g) => g.Title),
          },
          chart: {
            type: "column",
          },
          yAxis: {
            title: {
              text: "Gross ($)",
            },
          },
          series: [
            {
              type: "column",
              name: "Gross of movies",
              data: grosses.map((g) => g.Gross),
            },
          ],
          title: {
            text: "Gross of 10 movies",
          },
        }}
        highcharts={Highcharts}
      />

      <HighchartsReact
        options={{
          xAxis: {
            categories: duration.map((d) => d.Title),
          },
          yAxis: {
            title: {
              text: "Durée (min)",
            },
          },
          chart: {
            type: "line",
          },
          series: [
            {
              type: "line",
              name: "Duration of differents movies",
              data: grosses.map((d) => d.Duration),
            },
          ],
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true,
              },
              enableMouseTracking: false,
            },
          },
          title: {
            text: "Duration of 10 movies",
          },
        }}
        highcharts={Highcharts}
      />
    </div>
  );
};

export default Dashboard;
