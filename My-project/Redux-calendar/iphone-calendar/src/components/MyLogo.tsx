import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { hidden_navbar } from '../redux/actions'

const MyLogo: React.FC<any> = ({ navbar, hidden_navbar }) => {
  const classes: string[] = ['MY_CALENDAR']

  if (navbar) classes.push('clickAuth')

  return (
    <React.Fragment>
      <NavLink
        to="/"
        className={classes.join(' ')}
        onClick={() => hidden_navbar(false)}
      >
        ♦️MY_CALENDAR♦️
      </NavLink>
    </React.Fragment>
  )
}

const mapDispatchToProps = { hidden_navbar }
const mapStateToProps = (state: any) => {
  return {
    navbar: state.auth.navbar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyLogo)
