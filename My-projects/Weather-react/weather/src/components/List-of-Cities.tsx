import { Container, List } from '@material-ui/core'
import React from 'react'
import { FoundCity } from './Found-City'

export const ListOfSities: React.FC<any> = ({ enteredCityMatches }) => {
  //       //   const res = await fetch(
  //       //     'https://api.openweathermap.org/data/2.5/weather?q=kiev&appid=540f066413819eb44d83e625b723cf60'
  //       //   )
  //   }, [])
  return (
    <Container fixed maxWidth="xs">
      <div>
        <List>
          {enteredCityMatches.map((elem: any) => {
            return <FoundCity elemCity={elem} key={elem.id} />
          })}
          {!enteredCityMatches.length && <li>City not found</li>}
        </List>
      </div>
    </Container>
  )
}
