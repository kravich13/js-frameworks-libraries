import { AppBar, Container, List, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar>
          <Typography variant="h6">
            <NavLink to="/" title="To the main">
              Weather
            </NavLink>
          </Typography>
          <List>
            <li>
              <NavLink to="/cards" title="Saved sities">
                About fulfilled conditions
              </NavLink>
            </li>
          </List>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
