import { useEffect } from "react"
import { useNewsContext } from "../context/NewsContext"
import axios from "axios"

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=Munich,de&APPID=89ebbbab424faab1842d6a1e624ca746&units=metric'

function useWeather() {
    const {dispatch} = useNewsContext()

    useEffect(() => {
        async function fetchWeather() {
            dispatch({type: 'SET_WEATHER_LOADING'})
            try {
                const res = await axios.get(API_URL)
                dispatch({type: "SET_WEATHER", payload: res.data})
                console.log(res.data);
                
            } catch(error) {
                dispatch({type: "SET_WEATHER_ERROR", payload: error.message})
            }
        }
        fetchWeather()
    }, [dispatch])
}

export default useWeather;