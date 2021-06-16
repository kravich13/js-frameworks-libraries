import React from 'react'
import { FoundCity } from './Found-City'
import { Container, List, makeStyles } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import { IListOfCity_Props } from '../interfaces'

const useStyles = makeStyles({ root: { textAlign: 'center' } })

export const ListOfSities: React.FC<IListOfCity_Props> = ({
  enteredCityMatches,
}) => {
  const classes: ClassNameMap<string> = useStyles()
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
