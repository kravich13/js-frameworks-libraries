import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import { ITemp_Props } from '../interfaces'

const useStyles = makeStyles({
  time: {
    paddingLeft: 0,
    paddingRight: 0,
    borderLeft: '1px solid #c9c9c9',
    textAlign: 'center',
  },
  temp: {
    position: 'absolute',
    padding: 3,
    width: 60,
    borderBottom: '1px  solid rgb(150, 200, 156)',
    textAlign: 'center',
  },
})

export const Temp: React.FC<ITemp_Props> = ({
  temp,
  index,
  fullDate,
  parentHeight,
}) => {
  const classes: ClassNameMap<string> = useStyles()

  const titleTemp: string =
    temp > 0 ? `+${temp}` : temp < 0 ? `-${temp}` : `${temp}`

  const timeRegexp: RegExpMatchArray | null = fullDate.match(/\d{2}:\d{2}/i)
  const time: string = timeRegexp?.length ? timeRegexp[0] : 'nope'

  return (
    <React.Fragment>
      <Container className={classes.time}>{time}</Container>
      <Typography
        component="p"
        className={classes.temp}
        style={{
          background: `rgb(2${temp + temp * 1.3}, 250, 156)`,
          top: `${parentHeight / 2 - temp}px`,
          left: `${index * 66}px`,
        }}
      >
        {titleTemp}
      </Typography>
    </React.Fragment>
  )
}
