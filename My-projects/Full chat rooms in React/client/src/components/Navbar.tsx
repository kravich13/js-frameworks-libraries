import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

export const Navbar: React.FC = () => {
  const setDocumentTitle = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    const et = event.target as HTMLAnchorElement
    document.title = et.textContent as string
  }
  return (
    <ul id="container-url">
      <li>
        <NavLink to="/" onClick={setDocumentTitle}>
          Главная страница
        </NavLink>
      </li>
      <li>
        <NavLink to="/rooms" onClick={setDocumentTitle}>
          Чат комнаты
        </NavLink>
      </li>
      <li>
        <NavLink to="/kravich" onClick={setDocumentTitle}>
          О проекте
        </NavLink>
      </li>
    </ul>
  )
}
