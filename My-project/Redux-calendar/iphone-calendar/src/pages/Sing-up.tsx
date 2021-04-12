import React from 'react'
import { NavLink } from 'react-router-dom'
import { MyLogo } from '../components/MyLogo'

export const SingUp: React.FC = () => {
  return (
    <React.Fragment>
      <MyLogo trueNavbar={true} />
      <div id="window-registation">
        <h2>Создать аккаунт</h2>

        <form id="form-sing-up" action="">
          <div id="login-birthday">
            <label>
              <p>Логин</p>
              <input type="text" />
            </label>

            <label className="label-right">
              <p>Дата рождения</p>
              <input type="date" />
            </label>
          </div>

          <div id="singUp-password">
            <label>
              <p>Пароль</p>
              <input type="password" />
            </label>

            <label className="label-right">
              <p>Подтвердите пароль</p>
              <input type="password" />
            </label>
          </div>
          <div id="create-account">
            <button>Создать аккаунт</button>
          </div>
        </form>
      </div>

      <label id="registration-true">
        <span>Уже зарегистрированы? </span>
        <NavLink to="/login">Вход</NavLink>
      </label>
    </React.Fragment>
  )
}
