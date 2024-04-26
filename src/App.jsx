import { useState, useEffect } from 'react'
import useGeolocation from './hooks/useGeoLocation';
import axios from 'axios'
import './App.css'
import { IoLocation } from "react-icons/io5";

const apiKey = import.meta.env.VITE_API_KEY;
const apiLink = import.meta.env.VITE_API;

function App() {
  const { latitude, longitude, error }= useGeolocation()
  const [data, setData] = useState({})
  const [location, SetLocation] = useState('')
  const [info, setInfo] = useState(false)

  const url = `${apiLink}?q=${location}&units=metric&appid=${apiKey}&lang=pt_br`


  if(!info) {
    const urlLocation = `${apiLink}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=pt_br`
    console.log(`link: ${urlLocation}`)
    axios.get(urlLocation).then((response) => {
      setData(response.data)
      console.log(response.data)
      setInfo(true)
    })
  }
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        SetLocation('')
      })
    }
  }

  const handleClick = () => {
    const urlLocation = `${apiLink}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=pt_br`
    console.log(`link: ${urlLocation}`)
    axios.get(urlLocation).then((response) => {
      setData(response.data)
      console.log(response.data)
      setInfo(true)
    })
  }

  // foto de fundo
  


  // direção do vento:
  function obterDirecaoDoVento(angulo) {
    if (angulo >= 337.5 || angulo < 22.5) {
        return "Norte";
    } else if (angulo >= 22.5 && angulo < 67.5) {
        return "Nordeste";
    } else if (angulo >= 67.5 && angulo < 112.5) {
        return "Leste";
    } else if (angulo >= 112.5 && angulo < 157.5) {
        return "Sudeste";
    } else if (angulo >= 157.5 && angulo < 202.5) {
        return "Sul";
    } else if (angulo >= 202.5 && angulo < 247.5) {
        return "Sudoeste";
    } else if (angulo >= 247.5 && angulo < 292.5) {
        return "Oeste";
    } else {
        return "Noroeste";
    }
}



  if(!info) return <div className='loading'></div>

  return (
    <>
      <div className='App'>
          <div className="container">
            <div className="search">
              <input 
              type="text" 
              placeholder='Procure uma cidade'
              value={location}
              onChange={event => SetLocation(event.target.value)}
              onKeyDown={searchLocation}/>
              <IoLocation className='pin-location' onClick={handleClick}/>
            </div>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                <h1>{Math.round(data.main.temp)}ºC</h1>
                <div className="min-max">
                  <div className="min">
                    <span>{Math.round(data.main.temp_min)}ºC</span>
                    <span>MIN</span>
                  </div>
                  <div className="min">
                    <span>{Math.round(data.main.temp_max)}ºC</span>
                    <span>MAX</span>
                  </div>
                </div>
              </div>
              <div className="description">
                <p>{data.weather[0].description}</p>
              </div>
            </div>
            <div className="bottom">
              <div className="feelsLike">
                <p className='bold'>{Math.round(data.main.feels_like)}ºC</p>
                <p>Sensação</p>
              </div>
              <div className="humidity">
                <p className='bold'>{data.main.humidity}%</p>
                <p>Humidade</p>
              </div>
              <div className="wind">
                <p className='bold'>{data.wind.speed.toFixed(1)} KM/H</p>
                <p>Vento ({obterDirecaoDoVento(data.wind.deg)})</p>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App



