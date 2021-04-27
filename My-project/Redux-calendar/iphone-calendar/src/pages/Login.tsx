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
    eventSingUpAuth: state.auth.eventSingUpAuth,
    authorized: state.auth.authorized
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Login: React.FC<PropsFromRedux> = ({
  eventSingUpAuth,
  authorized,
  req_auth,
  req_clearMessage,
  hidden_navbar
}) => {
  const $userName = useRef<any>(null)
  const $userPassword = useRef<any>(null)

  const loginSubmit = (event: React.ChangeEvent<HTMLFormElement>): any => {
    event.preventDefault()

    const name: string = $userName.current.value
    const password: string = $userPassword.current.value

    if (name.length < 3) return ($userName.current.placeholder = 'Короткое имя')
    if (password.length < 8)
      return ($userPassword.current.value = 'Короткий пароль')

    req_auth({ name, password })
  }

  const clearEvents = useCallback((): void => {
    req_clearMessage('')
  }, [req_clearMessage])

  useEffect((): void => {
    hidden_navbar(true)
  }, [hidden_navbar])

  useEffect((): void => {
    if (eventSingUpAuth === '') return

    alert(eventSingUpAuth)
    clearEvents()

    if (authorized) hidden_navbar(false)
  }, [eventSingUpAuth, clearEvents, authorized, hidden_navbar])

  function UserAuthorized({
    authorized
  }: IComponent_UserAuthorized): null | any {
    if (!authorized) return null
    return <Redirect to="/" />
  }

  return (
    <React.Fragment>
      <MyLogo />
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

        <NavLink to="/sing-up">Регистрация</NavLink>
      </label>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
