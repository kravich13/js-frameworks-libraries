import React from 'react'
import { IListEnteredCity_Props } from '../interfaces'
import { CardCity } from './CardCity'

export const ListEnteredCities: React.FC<IListEnteredCity_Props> = ({
  enteredCities,
}) => {
  return (
    <React.Fragment>
      {enteredCities.map((elem): JSX.Element => {
        return <CardCity stateCity={elem} key={elem.id} />
      })}
    </React.Fragment>
  )
}
