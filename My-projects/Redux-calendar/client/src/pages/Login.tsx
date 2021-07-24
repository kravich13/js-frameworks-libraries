import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { req_auth, hidden_navbar, actions_withAlert } from '../redux/actions'
import MyLogo from '../components/MyLogo'
import { ImapDispatchToProps, IMapStateToProps } from '../interfaces'
import '../styles/forms-auth-login.css'
import UserAuthorized from '../components/Redirect/User-Auth'

const mapDispatchToProps: ImapDispatchToProps = {
  req_auth,
  hidden_navbar,
  actions_withAlert,
}
const mapStateToProps = (state: IMapStateToProps) => {
  return { authorized: state.auth.authorized }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Login: React.FC<PropsFromRedux> = ({
  authorized,
  req_auth,
  hidden_navbar,
  actions_withAlert,
}) => {
  const [loginValue, setLoginValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const loginSubmit = (
    event: React.ChangeEvent<HTMLFormElement>
  ): string | void => {
    event.preventDefault()

    const et = event.target as HTMLFormElement
    const $userName = et.elements.namedItem('login') as HTMLInputElement

    if (loginValue.length < 3) {
      setLoginValue('')
      return ($userName.placeholder = 'Короткое имя')
    }
    if (passwordValue.length < 8) {
      actions_withAlert('Короткий пароль')
      return setPasswordValue('')
    }

    $userName.placeholder = 'Введите имя'
    req_auth({ loginValue, passwordValue })
  }

  return (
    <div id="container-auth-login">
      <div id="auth-login-MyLogo">
        <MyLogo />
      </div>

      <UserAuthorized authorized={authorized} />
      <form id="window-autorization" onSubmit={loginSubmit}>
        <h2>Вход</h2>

        <label>
          <p>Имя пользователя</p>
          <input
            type="text"
            onChange={(e) => setLoginValue(e.target.value)}
            name="login"
          />
        </label>

        <label>
          <p>Пароль</p>
          <input
            type="password"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </label>

        <div id="log-into-account">
          <button>Вход</button>
        </div>
      </form>

      <label id="registration-true">
        <span>Ешё нет аккаунта? </span>

        <NavLink to="/sign-up">Регистрация</NavLink>
      </label>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
