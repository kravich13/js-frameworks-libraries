import { Container, List, makeStyles } from '@material-ui/core'
import React from 'react'
import { IListOfCity_Props } from '../interfaces'
import { FoundCity } from './Found-City'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

export const ListOfSities: React.FC<IListOfCity_Props> = ({
  enteredCityMatches,
}) => {
  const classes = useStyles()
  return (
    <Container fixed maxWidth="xs">
      <List className={classes.root}>
        {enteredCityMatches.map((elem): JSX.Element => {
          return <FoundCity stateCity={elem} key={elem.id} />
        })}
      </List>
    </Container>
  )
}
