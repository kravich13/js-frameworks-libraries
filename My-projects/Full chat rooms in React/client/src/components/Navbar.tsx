import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

export const Navbar: React.FC = () => {
  return (
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
  )
}
