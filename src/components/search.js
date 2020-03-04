
export function loadWeatherForCity(city){
    let requestURL = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d1777fe0c5b654144cce1e875cd85676";
    let request = new XMLHttpRequest();
    request.open("get", requestURL);
    request.send();
    return request;
}

export function JSON2Dict(requestJson){
    let dict = Object();
    if(requestJson){
        dict['name'] = requestJson.name;
        dict['temp'] = requestJson.main.temp - 273.15;
        dict['temp_like'] = requestJson.main.feels_like - 273.15;
        dict['humidity'] = requestJson.main.humidity;
        dict['sky'] = requestJson.weather[0].main;
        dict['sky_description'] = requestJson.weather[0].description;
        dict['wind_speed'] = requestJson.wind.speed;
        dict['wind_degree'] = requestJson.wind.deg;
    }
    return dict;
}

export function loadWeatherIcon(sky) {
    if(sky == "few clouds"){
        return require("./../assets/few_clouds.svg");
    } else if(sky == "clear sky"){
        return require("./../assets/sunny.svg");
    } else if(sky == "Rain"){
        return require("./../assets/rain.svg");
    } else if(sky == "scattered clouds" || sky == "broken clouds" || sky == "overcast clouds"){
        return require("./../assets/clouds.svg");
    } else if(sky == "shower rain" || sky == "light intensity shower rain"){
        return require("./../assets/rain.svg");
    } else if(sky == "rain" || sky == "light rain"){
        return require("./../assets/Light_rain.svg");
    } else if(sky == "light intensity drizzle rain"){
        return require("./../assets/Drizzle.svg");
    } else if(sky == "thunderstorm"){
        return require("./../assets/thunder.svg");
    } else if(sky == "snow" || sky == "light snow"){
        return require("./../assets/snow.svg");
    } else if(sky == "mist"){
        return require("./../assets/mist.svg");
    } else {
        return require("./../assets/Question.svg");
    }
}

var windPositions = {
    0: "N",
    45: "NE",
    90: "E",
    135: "SE",
    180: "S",
    225: "SW",
    270: "W",
    315: "NW",
    360: "N"
};

export function windPosition(wind_degree){
    for(let i in windPositions){
        if(Math.abs(i - wind_degree) < 23){
            return windPositions[i];
        }
    }
}

export default loadWeatherForCity;