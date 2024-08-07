import React from 'react'
import "./card.css"
import { FaCloud } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

const CityCard = ({ cities }) => {


    const fahrenheitToCelsius = (city) => {
        return (city.main.temp - 273.15).toFixed(2)
    }

    return (
        <div className="flex flex-wrap gap-5 mt-10">
            {cities.map((city, index) => (
                <div key={index}>
                    <div className="card p-5 w-fit rounded-xl">
                        <p className="text-4xl">{city.name}</p>

                        <div className="flex items-center gap-3">
                            <span>{city.weather[0].description}</span>
                            <span className="">{city.weather[0].main === "Clouds" ? <FaCloud size={20} /> :
                                <span className="text-yellow-300"><MdSunny size={20} /></span>}
                            </span>
                        </div>
                        <p className="text-xl">{fahrenheitToCelsius(city)} °C</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CityCard