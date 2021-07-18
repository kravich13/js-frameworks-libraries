import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { hidden_navbar, log_out } from '../redux/actions'
import MyLogo from './MyLogo'
import {
  ImapDispatchToProps,
  IMapStateToProps,
  IComponent_UserAuthorized,
} from '../interfaces'

const mapDispatchToProps: ImapDispatchToProps = { hidden_navbar, log_out }
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    authorized: state.auth.authorized,
    userName: state.auth.userName,
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Navbar: React.FC<PropsFromRedux> = ({
  authorized,
  userName,
  log_out,
  hidden_navbar,
}) => {
  const onClick: Function = (
    e: React.MouseEvent<HTMLLinkElement>,
    flag: boolean
  ): void => {
    const et = e.target as HTMLLinkElement

    document.title = et.textContent as string
    hidden_navbar(flag)
  }

  function UserAuthorized({
    authorized,
  }: IComponent_UserAuthorized): JSX.Element {
    if (authorized) {
      return (
        <React.Fragment>
          <li title="В разработке">
            <span className="login-information">{userName}</span>
          </li>
          <li
            onClick={() => log_out('Вы вышли из системы')}
            title="Выйти из аккаунта"
          >
            <span className="login-information">Выйти</span>
          </li>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <li onClick={(e) => onClick(e, true)}>
          <NavLink to="/login">Вход</NavLink>
        </li>
        <li onClick={(e) => onClick(e, true)}>
          <NavLink to="/sign-up">Регистрация</NavLink>
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
        <li onClick={(e) => onClick(e, false)} title="Посмотреть информацию">
          <NavLink to="/about">О проекте</NavLink>
        </li>
        <UserAuthorized authorized={authorized} />
      </ul>
    </header>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
