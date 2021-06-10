import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { ListOfTemp } from '../components/ListOfTemp'
import { ImapStateToProps } from '../interfaces'

const mapStateToProps = (state: ImapStateToProps) => {
  return {
    data: state.search.clickedItemDetails,
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const DetailedCity: React.FC<PropsFromRedux> = ({ data }) => {
  if (!data) return null

  const { title, icon, weather, weatherDesc, high, low, temp, wind, pressure } =
    data

  const signToTemp: string = temp > 0 ? '+' : temp < 0 ? '-' : ''
  return (
    <section id="detailed-information">
      <div>
        <img
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt="Weather icon"
        />
        <p>{title}</p>
      </div>
      <div>
        <p>{weather}</p>
        <p>{weatherDesc}</p>
      </div>
      <div>
        <p>H:{high}°C</p>
        <p>L:{low}°C</p>
      </div>
      <div>
        <h2>
          {signToTemp}
          {temp}
        </h2>
      </div>
      <div>
        <p>Wind: {wind} m/s</p>
        <p>Pressure: {pressure} mbar</p>
      </div>
      <div>
        <ListOfTemp hoursTemp={data.hoursTemp} />
      </div>
    </section>
  )
}

export default React.memo(connect(mapStateToProps)(DetailedCity))
