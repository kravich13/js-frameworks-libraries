import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { hidden_navbar, log_out } from '../redux/actions'
import MyLogo from './MyLogo'
import {
  ImapDispatchToProps,
  IMapStateToProps,
  IComponent_UserAuthorized
} from '../interfaces'

const mapDispatchToProps: ImapDispatchToProps = { hidden_navbar, log_out }
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    authorized: state.auth.authorized
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Navbar: React.FC<PropsFromRedux> = ({
  authorized,
  log_out,
  hidden_navbar
}) => {
  function UserAuthorized({ authorized }: IComponent_UserAuthorized): any {
    if (authorized)
      return (
        <React.Fragment>
          <li>
            <span className="login-information">{authorized}</span>
          </li>
          <li
            onClick={() => {
              log_out()
              alert('Вы вышли из системы.')
            }}
          >
            <span className="login-information">Выйти</span>
          </li>
        </React.Fragment>
      )

    return (
      <React.Fragment>
        <li onClick={() => hidden_navbar(true)}>
          <NavLink to="/login">Вход</NavLink>
        </li>
        <li onClick={() => hidden_navbar(true)}>
          <NavLink to="/sing-up">Регистрация</NavLink>
        </li>
      </React.Fragment>
    )
  }

  return (
    <header>
      <div id="navbarTitle">
        <MyLogo />
      </div>
      <ul id="container-url">
        <li onClick={() => hidden_navbar(false)}>
          <NavLink to="/about">О проекте</NavLink>
        </li>
        <UserAuthorized authorized={authorized} />
      </ul>
    </header>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
