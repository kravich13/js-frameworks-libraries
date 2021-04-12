import React from 'react'
import { NavLink } from 'react-router-dom'
import { MyLogo } from '../components/MyLogo'

export const Login: React.FC = () => {
  return (
    <React.Fragment>
      <MyLogo trueNavbar={true} />
      <form action="" id="window-autorization">
        <h2>Вход</h2>

        <label>
          <p>Имя пользователя</p>
          <input type="text" />
        </label>

        <label>
          <p>Пароль</p>
          <input type="password" />
        </label>

        <div id="log-into-account">
          <button>Вход</button>
        </div>
      </form>

      <label id="registration-true">
        <span>Ешё нет аккаунта? </span>

        <NavLink to="/sing-up">Регистрация</NavLink>
      </label>
    </React.Fragment>
  )
}
