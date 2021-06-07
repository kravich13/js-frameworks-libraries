import { Container, List } from '@material-ui/core'
import React from 'react'
import { IListOfCity_Props } from '../interfaces'
import { FoundCity } from './Found-City'

export const ListOfSities: React.FC<IListOfCity_Props> = ({
  enteredCityMatches,
}) => {
  //       //   const res = await fetch(
  //       //     'https://api.openweathermap.org/data/2.5/weather?q=kiev&appid=540f066413819eb44d83e625b723cf60'
  //       //   )
  //   }, [])
  return (
    <Container fixed maxWidth="xs">
      <div>
        <List>
          {enteredCityMatches.map((elem): JSX.Element => {
            return <FoundCity stateCity={elem} key={elem.id} />
          })}
        </List>
      </div>
    </Container>
  )
}
