import React, { useRef, useEffect, useCallback } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { req_auth, req_clearMessage, hidden_navbar } from '../redux/actions'
import MyLogo from '../components/MyLogo'
import {
  ImapDispatchToProps,
  IMapStateToProps,
  IComponent_UserAuthorized
} from '../interfaces'

const mapDispatchToProps: ImapDispatchToProps = {
  req_auth,
  req_clearMessage,
  hidden_navbar
}
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    eventSignUpAuth: state.auth.eventSignUpAuth,
    authorized: state.auth.authorized
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Login: React.FC<PropsFromRedux> = ({
  eventSignUpAuth,
  authorized,
  req_auth,
  req_clearMessage,
  hidden_navbar
}) => {
  const $userName = useRef<HTMLInputElement>(null)
  const $userPassword = useRef<HTMLInputElement>(null)

  const loginSubmit = (
    event: React.ChangeEvent<HTMLFormElement>
  ): string | void => {
    event.preventDefault()

    const name: string = $userName.current!.value
    const password: string = $userPassword.current!.value

    if (name.length < 3) {
      $userName.current!.value = ''
      return ($userName.current!.placeholder = 'Короткое имя')
    }
    if (password.length < 8) {
      alert('Короткий пароль')
      $userPassword.current!.value = ''
      return
    }

    $userName.current!.placeholder = 'Введите имя'
    req_auth({ name, password })
  }

  const clearEvents = useCallback((): void => {
    req_clearMessage('')
  }, [req_clearMessage])

  useEffect((): void => {
    hidden_navbar(true)
  }, [hidden_navbar])

  useEffect((): void => {
    if (eventSignUpAuth === '') return

    alert(eventSignUpAuth)
    clearEvents()

    if (authorized) hidden_navbar(false)
  }, [eventSignUpAuth, clearEvents, authorized, hidden_navbar])

  function UserAuthorized({
    authorized
  }: IComponent_UserAuthorized): null | JSX.Element {
    if (!authorized) return null
    return <Redirect to="/" />
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
          <input type="text" ref={$userName} />
        </label>

        <label>
          <p>Пароль</p>
          <input type="password" ref={$userPassword} />
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
