import React from 'react'
import { NavLink } from 'react-router-dom'
import MyLogo from './MyLogo'
// import { IContext } from '../interfaces'
import { connect } from 'react-redux'
import { hidden_navbar } from '../redux/actions'

const Navbar: React.FC<any> = ({ authorized, hidden_navbar }) => {
  function UserAuthorized({ authorized }: any) {
    if (authorized)
      return (
        <React.Fragment>
          <li>
            <span className="login-information">{authorized}</span>
          </li>
          <li>
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
        <MyLogo trueNavbar={false} />
      </div>
      <ul id="container-url">
        <UserAuthorized authorized={authorized} />
      </ul>
    </header>
  )
}

const mapDispatchToProps = { hidden_navbar }
const mapStateToProps = (state: any) => {
  return {
    authorized: state.auth.authorized
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
