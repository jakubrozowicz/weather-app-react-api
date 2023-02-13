import React from "react";
import "./Result.css";

const Result = (props) => {
  const {
    city,
    date,
    sunrise,
    sunset,
    temperature,
    pressure,
    wind,
    error,
  } = props.weather;

  let content = null;

  if (!error && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <div className="content">
        <h2>
          Wyniki wyszukiwania dla miasta: <em>{city.toUpperCase()}</em>
        </h2>
        <h3>Dzień i godzina wyszukiwania: {date}</h3>
        <h3>Temperatura: {temperature.toFixed(1)}&#176;C</h3>
        <h3>Wschód słońca o godzinie: {sunriseTime}</h3>
        <h3>Zachód słońca o godzinie: {sunsetTime}</h3>
        <h3>Siła wiatru: {wind.toFixed(1)} km/h</h3>
        <h3>Ciśnienie atmosferyczne: {pressure} hPa</h3>
      </div>
    );
  }

  return (
    <div className="result">
      {error ? (
        <span className="error">
          Brak miasta{" "}
          <strong style={{ color: "black", fontWeight: "bold" }}>{city}</strong>{" "}
          w bazie danych. Podaj inne miasto.
        </span>
      ) : (
        content
      )}
    </div>
  );
};

export default Result;
