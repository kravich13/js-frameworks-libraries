import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  deleteCity,
  updatedWeather,
  detailedInformation,
} from '../redux/actions'
import DeleteIcon from '@material-ui/icons/Delete'
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  makeStyles,
} from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import { ICardCity_Props } from '../interfaces'

const useStyles = makeStyles({
  root: {
    width: 400,
    background: '#bbdefb',
    border: '1px solid #424242',
    marginBottom: 10,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  buttons: {
    color: '#212121',
    background: '#ffab91',
    fontWeight: 600,
  },
  containerData: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  title: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 600,
  },
})

export const CardCity: React.FC<ICardCity_Props> = ({ stateCity }) => {
  const classes: ClassNameMap<string> = useStyles()
  const dispatch: Function = useDispatch()

  const { id, title, temp, icon } = stateCity
  const titleTemp: string =
    temp > 0 ? `+${temp}` : temp < 0 ? `-${temp}` : `${temp}`

  return (
    <Card className={classes.root}>
      <CardContent>
        <NavLink
          to="/detailinfo"
          title="See detailed information"
          onClick={() => dispatch(detailedInformation({ id, title }))}
        >
          <Container className={classes.containerData}>
            <p className={classes.title}>{title}</p>
            <img
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt="Weather icon"
            />
            <p className={classes.title}>{titleTemp}°C</p>
          </Container>
        </NavLink>
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            onClick={() => dispatch(updatedWeather({ id, title }))}
            title="Update the weather of this city"
            className={classes.buttons}
            startIcon={<AutorenewOutlinedIcon />}
            size="small"
          >
            Update
          </Button>
          <Button
            onClick={() => dispatch(deleteCity({ id, title }))}
            variant="contained"
            title="Delete this card"
            className={classes.buttons}
            startIcon={<DeleteIcon />}
            size="small"
          >
            delete
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
