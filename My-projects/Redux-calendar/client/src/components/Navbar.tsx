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
  // const history = useHistory()

  function handleClick(where: string, hiddenNav: boolean = false): void {
    // history.push(where)
    // console.log(history)
    hidden_navbar(hiddenNav)
  }

  function UserAuthorized({
    authorized,
  }: IComponent_UserAuthorized): JSX.Element {
    if (authorized)
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

    return (
      <React.Fragment>
        <li onClick={() => handleClick('/login', true)}>
          <NavLink to="/login">Вход</NavLink>
        </li>
        <li onClick={() => handleClick('/sign-up', true)}>
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
        <li onClick={() => handleClick('/about')} title="Посмотреть информацию">
          <NavLink to="/about">О проекте</NavLink>
        </li>
        <UserAuthorized authorized={authorized} />
      </ul>
    </header>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
