import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => {
  return (
    <header>
      <h2>Добро пожаловать!</h2>

      <ul id="container-url">
        <li>
          <NavLink to="/">Главная страница</NavLink>
        </li>
        <li>
          <NavLink to="/rooms">Чат комнаты</NavLink>
        </li>
        <li>
          <NavLink to="/kravich">О проекте</NavLink>
        </li>
      </ul>
    </header>
  )
}
