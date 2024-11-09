import React, { useEffect, useRef, useState } from 'react'
import "../style/Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import { toast } from 'react-toastify'

const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(null)

    const allicon = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        if(city === ""){
            toast.error("City name is not mentioned")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const res = await fetch(url)
            const data = await res.json()

            if(!res.ok){
                toast.error(`${data.message}`)
                return;
            }
            if (data.cod === 200) { // Ensure valid response
                const icon = allicon[data.weather[0].icon] || clear_icon;
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon
                })
            } else {
                console.error("City not found")
                
            }
        } catch (error) {
            setWeatherData(false);
            console.err("Error in fetching the weather data");
            
        }
    }

    useEffect(() => {
        search("Bhubaneswar")
    }, [])

    return (
        <div className='weather'>
            <div className="search_bar">
                <input ref={inputRef} type="text" placeholder='Enter the place name' />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData?<>
                {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="" className='weather_icon' />
                    <p className='temp'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>

                    <div className="weather_data">
                        <div className="col">
                            <img src={humidity_icon} alt="" />
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Enter a city to view weather data.</p>
            )}
            </>:<></>}

            
        </div>
    )
}

export default Weather
