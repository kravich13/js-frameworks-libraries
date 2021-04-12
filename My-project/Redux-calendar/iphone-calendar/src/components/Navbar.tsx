import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Context from '../context'
import { MyLogo } from './MyLogo'
import { IContext } from '../interfaces'

export const Navbar: React.FC = () => {
  const { clickNavbar } = useContext<IContext>(Context)

  return (
    <header>
      <div id="navbarTitle">
        <MyLogo trueNavbar={false} />
      </div>
      <ul id="container-url">
        <li onClick={() => clickNavbar(true)}>
          <NavLink to="/login">Вход</NavLink>
        </li>
        <li onClick={() => clickNavbar(true)}>
          <NavLink to="/sing-up">Регистрация</NavLink>
        </li>
      </ul>
    </header>
  )
}
