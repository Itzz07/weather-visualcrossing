"use client";
require("dotenv").config();
import { useEffect, useState } from "react";
import axios from "axios";

interface WeatherData {
  description: string;
  resolvedAddress: string;
  days: {
    temp: number;
    tempmax: number;
    tempmin: number;
    humidity: number;
    windspeed: number;
    conditions: string;
    description: string;
    datetime: string;
  }[];
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Lusaka"); // Default city
  const [unit, setUnit] = useState("metric"); // Default unit

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<WeatherData>(
          `${process.env.WEATHER_URL}/rest/services/timeline/${city}?unitGroup=${unit}&key=${process.env.WEATHER_API_KEY}&contentType=json`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city, unit]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };

  if (!weatherData) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <div className="text-center">
        {" "}
        <p>{weatherData.days[0].datetime}</p>
        <h2>{weatherData.resolvedAddress}</h2>
        <p>{weatherData.days[0].description} </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 pb-10">
        <div>
          <p className="flex text-9xl">
            {weatherData.days[0].temp}
            <span className="text-3xl">°C</span>
          </p>
          <div className="flex">
            <p className="p-1">{weatherData.days[0].conditions}</p>
            <p className="p-1">{weatherData.days[0].windspeed} km/h</p>
            <p className="p-1">{weatherData.days[0].humidity} %</p>
          </div>
        </div>
        <div className="text-center py-2 md:py-10">
          <label htmlFor="cityInput"></label>
          <input
            id="cityInput"
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Search by city"
          />
        </div>
        <div className="md:text-end">
          <label htmlFor="unitInput">Unit: </label>
          <select id="unitInput" value={unit} onChange={handleUnitChange}>
            <option value="metric">(Celsius/km)</option>
            <option value="uk">(Celsius/miles)</option>
            <option value="us">(Fahrenheit/miles)</option>
          </select>
        </div>
      </div>

    </div>
  );
};

export default Weather;
