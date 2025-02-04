import React from 'react'
import { useNewsContext } from '../context/NewsContext'

export default function Weather() {
    const { state } = useNewsContext();
    const { weather } = state;

    // Get current date and time
    const date = new Date();
    const currentDate = date.toLocaleDateString(); // Get the date (in local format)
    const currentTime = date.toLocaleTimeString(); // Get the time (in local format)

    const iconCode = weather.weather[0].icon;
    
    return (
        <div className="flex items-center space-x-3 text-sm text-gray-700">
            <div className="flex flex-col items-start">
                <p className="text-xs">{currentDate}, {currentTime}</p>
                <p className="text-xs">{weather.name}, {weather.sys.country}</p>
            </div>
            
            {/* Weather Icon */}
            <img
                src={`http://openweathermap.org/img/wn/${iconCode}.png`}
                alt={weather.weather[0].description}
                className="w-8 h-8"
            />
            
            {/* Temperature */}
            <div className="flex flex-col items-center">
                <p className="text-xl font-semibold">{weather.main.temp}°C</p>
                <p className="text-xs">{weather.weather[0].description}</p>
            </div>
            
            {/* Wind Speed */}
            <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-600 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18s2-6 9-6 9 6 9 6"></path>
                    <path d="M4 14s2-5 9-5 9 5 9 5"></path>
                    <path d="M5 10s2-4 9-4 9 4 9 4"></path>
                </svg>
                <p className="text-xs">{weather.wind.speed} m/s</p>
            </div>
        </div>
    );
}
