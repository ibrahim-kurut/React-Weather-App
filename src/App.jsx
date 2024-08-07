
import { useState } from 'react';
import './App.css';
import axios from 'axios';
// import { FaCloud } from "react-icons/fa6";
// import { MdSunny } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CityCard from './components/CityCard';
import Loading from './components/Loading';


function App() {

  const [location, setLocation] = useState('')
  const [data, setData] = useState({})
  const [cities, setCities] = useState([]);
  const [loding, setLoading] = useState(false);


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=764d4cda591d5752542efbea542869ba`


  // add city to card
  const addCityToCard = (data) => {

    const cityExists = cities.find(city => city.name === data.name);
    if (!cityExists) {
      setCities(prevCities => [...prevCities, data]);
    } else {
      toast.warn(`City ${data.name} is already in the list`);
    }

  }





  const searchLocation = () => {
    setLoading(true)
    axios.get(url)
      .then(response => {
        // console.log(response.data);
        setData(response.data);

        // =======================
        addCityToCard(response.data);
        // =======================

      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        if (error.request.status === 400) {
          toast.error("Please enter the city name")
        } else {
          toast.error(error.response.data.message)

        }

      })
      .finally(() => {
        setLoading(false);
      });

    setLocation('')
  }



  return (
    <div className="app">
      <ToastContainer position="top-right" theme="colored" />
      <div className="search flex justify-center pt-20">
        <div className="flex justify-between w-80 p-3  border border-gray-700 rounded-3xl">
          <input
            className=" bg-transparent outline-none placeholder-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type='text'
            placeholder="enter location"
          />
          <button onClick={searchLocation} className="text-black">
            Search
          </button>
        </div>
      </div>
      {/* ============= Loading ================ */}
      {
        loding && <Loading />
        // <Loading />
      }
      {/*  ============= Loading ================ */}


      <div className="container">
        <div className="top flex flex-col">
          {/* ================== City Card ====================== */}
          <CityCard cities={cities} />
          {/* ================== City Card ====================== */}

        </div>
        {/* bottom */}
        <div className="bottom flex justify-between  px-14 py-10 rounded-xl text-center">
          <div className="feels">
            {data.main ? <p>{data.main.feels_like}°F</p> : null}
            <span>Feels Like</span>
          </div>
          <div className="humidity">
            {data.main ?
              <p className="flex justify-center">
                <span>
                  {data.main.humidity}
                </span>
                <span>
                  <WiHumidity size={25} />
                </span>
              </p> : null}
            <span>Humidity</span>
          </div>
          <div className="wind">
            {data.wind ?
              <p className="flex justify-center items-center gap-2">
                <span>
                  {data.wind.speed} km/h
                </span>
                <span>
                  <FaWind size={15} />
                </span>
              </p> : null}
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;