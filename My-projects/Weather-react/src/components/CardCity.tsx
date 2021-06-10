import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ICardCity_Props } from '../interfaces'
import {
  deleteCity,
  updatedWeather,
  detailedInformation,
} from '../redux/actions'

export const CardCity: React.FC<ICardCity_Props> = ({ stateCity }) => {
  const dispatch = useDispatch()
  const { id, title, temp, icon } = stateCity
  const signToTemp: string = temp > 0 ? '+' : temp < 0 ? '-' : ''

  return (
    <li>
      <div className="cardCities">
        <NavLink
          to="/detailinfo"
          title="See detailed information"
          onClick={() => dispatch(detailedInformation({ id, title }))}
        >
          <p>
            {title}
            <img
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt="Weather icon"
            />
            <span>
              {signToTemp}
              {temp}°C
            </span>
          </p>
        </NavLink>
        <div>
          <button
            onClick={() => dispatch(updatedWeather({ id, title }))}
            className="button-of-cards"
          >
            Обновить данные о погоде
          </button>
          <button
            onClick={() => dispatch(deleteCity({ id, title }))}
            className="button-of-cards"
          >
            Удалить
          </button>
        </div>
      </div>
    </li>
  )
}
