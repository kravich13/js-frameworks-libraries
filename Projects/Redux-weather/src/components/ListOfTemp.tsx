import React, { useEffect, useRef, useState } from 'react'
import { Temp } from './Temp'
import { Container, makeStyles } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import { IListOfTemp_Props } from '../interfaces'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    width: 798,
    height: 250,
    marginTop: 50,
    paddingLeft: 0,
    paddingRight: 0,
    borderLeft: '3px solid lightgrey',
    borderRight: '3px solid lightgrey',
  },
})

export const ListOfTemp: React.FC<IListOfTemp_Props> = ({ hoursTemp }) => {
  const classes: ClassNameMap<string> = useStyles()
  const $container = useRef<HTMLDivElement>(null)
  const [parentHeight, setParentHeight] = useState<number>(0)

  useEffect((): void => {
    setParentHeight((prev: number) => (prev = $container.current!.offsetHeight))
  }, [$container])

  return (
    <Container className={classes.root} ref={$container}>
      {hoursTemp.map(({ temp, fullDate }, index: number): JSX.Element => {
        return (
          <Temp
            key={index}
            temp={temp}
            index={index}
            fullDate={fullDate}
            parentHeight={parentHeight}
          />
        )
      })}
    </Container>
  )
}
