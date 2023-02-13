import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";

const APIKey = "265e3ee14b8815ef894c42381a11150e";

class App extends Component {
  state = {
    value: "",
    city: "",
    date: "",
    sunrise: "",
    sunset: "",
    temperature: "",
    pressure: "",
    wind: "",
    error: false,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleCitySubmit = (e) => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&APPID=${APIKey}&units=metric`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error("Błąd");
      })
      .then((response) => response.json())
      .then((data) => {
        const time = new Date().toLocaleString();
        this.setState((prevState) => ({
          error: false,
          city: prevState.value,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temperature: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
        }));
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevState) => ({
          error: true,
          city: prevState.value,
        }));
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Aplikacja pogodowa w React</h1>
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
