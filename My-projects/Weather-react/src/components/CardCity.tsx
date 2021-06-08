import React from 'react'
import { useDispatch } from 'react-redux'
import { ICardCity_Props } from '../interfaces'
import { changeEnteredCity, updatedWeather } from '../redux/actions'

export const CardCity: React.FC<ICardCity_Props> = ({ stateCity }) => {
  const dispatch = useDispatch()
  const { id, title, temp, icon } = stateCity
  const signToTemp: string = temp > 0 ? '+' : temp < 0 ? '-' : ''

  return (
    <li>
      <div className="cardCities">
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
        <div>
          <button onClick={() => dispatch(updatedWeather({ id, title }))}>
            Обновить данные о погоде
          </button>
          <button onClick={() => dispatch(changeEnteredCity({ id, title }))}>
            Удалить
          </button>
        </div>
      </div>
    </li>
  )
}
