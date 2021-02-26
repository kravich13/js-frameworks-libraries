import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <h1>React + TypeScript</h1>
      <ul className="urlAdress">
        <li className="clickAdress">
          <NavLink to="/">Список дел</NavLink>
        </li>
        <li className="clickAdress">
          <NavLink to="/kravich">Перейти к Kravich</NavLink>
        </li>
        <li className="clickAdress">
          <NavLink to="/max">Перейти к Max</NavLink>
        </li>
      </ul>
    </div>
  )
}
