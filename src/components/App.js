import React, {Component} from "react";

import {loadWeatherForCity, JSON2Dict, loadWeatherIcon, windPosition} from "./search"
import "./../styles/style.sass"
import sunny from "../assets/sunny.svg";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            weather: undefined
        };

        this.searchWeatherListener = this.searchWeatherListener.bind(this);

    }

    render() {
        console.log(this.state);
        return(
            <div className="app">
                <div className="search">
                    <input type="text" id = "cityName" placeholder="Input city name" onChange={this.searchWeatherListener}/>
                </div>
                <div class = 'wrapper'>
                    {this.state.weather !== undefined ? <div className="weatherInfo">
                        <p className="city_name">{this.state.weather.name}</p>
                        <img src={loadWeatherIcon(this.state.weather.sky_description)} alt="Sunny" />
                        <p className="description">{this.state.weather.sky}</p>
                        <p className="temperature">{this.state.weather.temp.toFixed(1)}</p>
                        <p className="feels">Feels like: {this.state.weather.temp_like.toFixed(1)}</p>
                        <p className="wind">Wind: {this.state.weather.wind_speed.toFixed(1)}m/s {windPosition(this.state.weather.wind_degree)}</p>
                    </div>: "" }
                </div>
            </div>
        );
    };

    searchWeatherListener(e) {
        console.log(e.target.value);
        let request = loadWeatherForCity(e.target.value);
        request.onload = () => {
            if (request.status === 200) {
                this.setState({
                    weather: JSON2Dict(JSON.parse(request.response))
                });
            }
        }
    }

}

export default App;