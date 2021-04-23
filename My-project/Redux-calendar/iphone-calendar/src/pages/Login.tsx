import React, { useRef, useEffect, useCallback } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import MyLogo from '../components/MyLogo'
import { connect } from 'react-redux'
import { req_auth, req_clearMessage, hidden_navbar } from '../redux/actions'

const Login: React.FC<any> = ({
  req_auth,
  req_clearMessage,
  eventSingUpAuth,
  authorized,
  hidden_navbar
}) => {
  const $userName = useRef<any>(null)
  const $userPassword = useRef<any>(null)

  const loginSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name: string = $userName.current.value
    const password: string = $userPassword.current.value

    if (name.length < 3) return ($userName.current.placeholder = 'Короткое имя')
    if (password.length < 8)
      return ($userPassword.current.value = 'Короткий пароль')

    req_auth({ name, password })
  }

  const clearEvents = useCallback(() => {
    req_clearMessage('')
  }, [req_clearMessage])

  useEffect(() => {
    hidden_navbar(true)
  }, [hidden_navbar])

  useEffect(() => {
    if (eventSingUpAuth === '') return

    alert(eventSingUpAuth)
    clearEvents()

    if (authorized) hidden_navbar(false)
  }, [eventSingUpAuth, clearEvents, authorized, hidden_navbar])

  function UserAuthorized({ authorized }: any) {
    if (!authorized) return null
    return <Redirect to="/" />
  }

  return (
    <React.Fragment>
      <MyLogo trueNavbar={true} />
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

const mapDispatchToProps = { req_auth, req_clearMessage, hidden_navbar }
const mapStateToProps = (state: any) => {
  return {
    eventSingUpAuth: state.auth.eventSingUpAuth,
    authorized: state.auth.authorized
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
