import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => {
  return (
    <div>
      <h1>Кравичи</h1>

      <ul>
        <li>
          <NavLink to="/">Перейти к Владу</NavLink>
        </li>
        <li>
          <NavLink to="/max">Перейти к Максу</NavLink>
        </li>
        <li>
          <NavLink to="/katya">Перейти к Кате</NavLink>
        </li>
      </ul>
    </div>
  )
}
