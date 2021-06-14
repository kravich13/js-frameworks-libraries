import {
  AppBar,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  root: { display: 'flex', justifyContent: 'space-between' },
})

export const Navbar: React.FC = () => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar className={classes.root}>
          <Typography variant="h6">
            <NavLink to="/" title="To the main">
              Weather-Redux
            </NavLink>
          </Typography>
          <Typography variant="body1">
            <NavLink to="/about" title="=)">
              About the project
            </NavLink>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
