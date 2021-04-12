import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { IMyLogoProps, IContext } from '../interfaces'
import Context from '../context'

export const MyLogo: React.FC<IMyLogoProps> = ({ trueNavbar }) => {
  const { clickNavbar } = useContext<IContext>(Context)
  const classes: string[] = ['MY_CALENDAR']

  if (trueNavbar) classes.push('clickAuth')

  return (
    <React.Fragment>
      <NavLink
        to="/"
        className={classes.join(' ')}
        onClick={() => clickNavbar(false)}
      >
        ♦️MY_CALENDAR♦️
      </NavLink>
    </React.Fragment>
  )
}
