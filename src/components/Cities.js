import React,{useState,useEffect} from 'react';
import './../css/cities.css';
import {api} from './../constants/ApiConstants';

export function Cities(){

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(undefined);
    const [loading, setLoading] = useState(false);

    function searchWeather(){
        if(city !== undefined && city.trim() !== ""){
            setLoading(true);
            fetch(`${api.root}/weather?q=${city}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(json=>{
                setWeather(json);
                document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + json.weather[0].icon + ".png";
                setCity('');
                setLoading(false);
            })
            .catch(err => {
                alert(err);
                setLoading(false);
            })
        }else{
            alert("Please enter a value")
        }

    }

    function dateFormatter(datum){
        let months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let day = days[datum.getDay()];
        let date = datum.getDate();
        let month = months[datum.getMonth()];
        let year = datum.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    useEffect(()=>{
        console.log(weather)
    },[weather])

    return(
        <div className={weather ? (weather.main.temp > 15) ? 'cities warm' : 'cities cold' : 'cities'}>
            <div className="search-box">
                <input type="text" placeholder="search city" className="search-bar" value={city} onChange={e=>{setCity(e.target.value)}}/>
                <button className="search-button" onClick={searchWeather}>Search</button>
            </div>
            {weather && <div className="location-container">
                 <div className="location-box">
                    <div className="location">
                        {weather.name}, {weather.sys.country}
                    </div>
                    <div className="date">
                        {dateFormatter(new Date())}
                    </div>
                 </div>
                 <div className="weather-box">
                    <div className="temp">
                        {Math.round(weather.main.temp)}&#8451;
                    </div>
                    <div className="weather">
                        <img src="" alt="icon" className="icon"/>
                        {weather.weather[0].main}
                    </div>
                 </div>
            </div>}
            {loading && <div className="loader"></div>}
        </div>
    )
}