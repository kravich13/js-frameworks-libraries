import { Container, makeStyles } from '@material-ui/core'
import React from 'react'
import { IListOfTemp_Props } from '../interfaces'
import { Temp } from './Temp'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    width: 798,
    height: 200,
    borderLeft: '3px solid lightgrey',
    borderRight: '3px solid lightgrey',
  },
})

export const ListOfTemp: React.FC<IListOfTemp_Props> = ({ hoursTemp }) => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      {hoursTemp.map((elem, index: number) => {
        return <Temp key={index} title={elem} index={index} />
      })}
    </Container>
  )
}
