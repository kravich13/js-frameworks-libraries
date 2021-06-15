import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { ListOfTemp } from '../components/ListOfTemp'
import {
  Card,
  CardContent,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { ImapStateToProps } from '../interfaces'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  cardInfo: {
    minWidth: 600,
  },
  generalStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pAll: { width: 200, flexGrow: 1 },
  pRight: { textAlign: 'right' },
})

const mapStateToProps = (state: ImapStateToProps) => {
  return { data: state.search.clickedItemDetails }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const DetailedCity: React.FC<PropsFromRedux> = ({ data }) => {
  const classes = useStyles()

  if (!data) return null

  const { title, icon, weather, weatherDesc, high, low, temp, wind, pressure } =
    data

  const titleTemp: string =
    temp > 0 ? `+${temp}` : temp < 0 ? `-${temp}` : `${temp}`
  return (
    <Container className={classes.root}>
      <Card className={classes.cardInfo}>
        <CardContent>
          <Container className={classes.generalStyles}>
            <img
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt="Weather icon"
            />
            <Typography variant="h6">{title}</Typography>
          </Container>
          <Container className={classes.generalStyles}>
            <Typography variant="body1" className={classes.pAll}>
              {weather}
            </Typography>
            <Typography
              variant="body1"
              className={`${classes.pAll} ${classes.pRight}`}
            >
              {weatherDesc}
            </Typography>
          </Container>
          <Container className={classes.generalStyles}>
            <Typography variant="body1" className={classes.pAll}>
              H:{high}°C
            </Typography>
            <Typography
              variant="body1"
              className={`${classes.pAll} ${classes.pRight}`}
            >
              L:{low}°C
            </Typography>
          </Container>
          <Container className={classes.generalStyles}>
            <Typography variant="h5">{titleTemp}°C</Typography>
          </Container>
          <Container className={classes.generalStyles}>
            <Typography variant="body1" className={classes.pAll}>
              Wind: {wind} m/s
            </Typography>
            <Typography
              variant="body1"
              className={`${classes.pAll} ${classes.pRight}`}
            >
              Pressure: {pressure} mbar
            </Typography>
          </Container>
        </CardContent>
      </Card>

      <Container>
        <ListOfTemp hoursTemp={data.intervalData} />
      </Container>
    </Container>
  )
}

export default connect(mapStateToProps)(DetailedCity)
