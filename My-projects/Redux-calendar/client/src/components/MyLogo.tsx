import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { hidden_navbar } from '../redux/actions'
import { ImapDispatchToProps, IMapStateToProps } from '../interfaces'

const mapDispatchToProps: ImapDispatchToProps = { hidden_navbar }
const mapStateToProps = (state: IMapStateToProps) => {
  return { navbar: state.auth.navbar }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const MyLogo: React.FC<PropsFromRedux> = ({ navbar, hidden_navbar }) => {
  const classes: string[] = ['MY_CALENDAR']

  if (navbar) classes.push('clickAuth')

  return (
    <React.Fragment>
      <NavLink
        title="Перейти на главную страницу"
        to="/"
        className={classes.join(' ')}
        onClick={() => hidden_navbar(false)}
      >
        ♦️MY_CALENDAR♦️
      </NavLink>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MyLogo)
