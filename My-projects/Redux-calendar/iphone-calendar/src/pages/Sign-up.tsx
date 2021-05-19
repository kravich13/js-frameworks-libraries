import React, { useCallback, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { req_signUp, req_clearMessage, hidden_navbar } from '../redux/actions'
import MyLogo from '../components/MyLogo'
import { ImapDispatchToProps, IMapStateToProps } from '../interfaces'

const mapDispatchToProps: ImapDispatchToProps = {
  req_signUp,
  req_clearMessage,
  hidden_navbar
}
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    eventSignUpAuth: state.auth.eventSignUpAuth
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const SignUp: React.FC<PropsFromRedux> = ({
  eventSignUpAuth,
  req_signUp,
  req_clearMessage,
  hidden_navbar
}) => {
  const $login = useRef<HTMLInputElement>(null)
  const $birthday = useRef<HTMLInputElement>(null)
  const $password = useRef<HTMLInputElement>(null)
  const $passwordConfirm = useRef<HTMLInputElement>(null)

  const signUpForm = (
    event: React.FormEvent<HTMLFormElement>
  ): void | string => {
    event.preventDefault()

    const login: string = $login.current!.value
    const birthday: string = $birthday.current!.value
    const password: string = $password.current!.value
    const passwordConfirm: string = $passwordConfirm.current!.value

    if (login.length < 3) return ($login.current!.placeholder = 'Короткое имя')
    if (!birthday) return alert('Неправильная дата рождения')

    if (password.length < 8) return alert('Короткий пароль')
    if (passwordConfirm !== password)
      return alert('Неверный подтверждённый пароль')

    req_signUp({
      login,
      birthday,
      password,
      passwordConfirm
    })
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
  }, [eventSignUpAuth, clearEvents])

  return (
    <div id="container-auth-login">
      <div id="auth-login-MyLogo">
        <MyLogo />
      </div>

      <div id="window-registation">
        <h2>Создать аккаунт</h2>

        <form id="form-sign-up" onSubmit={signUpForm}>
          <div id="login-birthday">
            <label>
              <p>Логин</p>
              <input type="text" ref={$login} />
            </label>

            <label className="label-right">
              <p>Дата рождения</p>
              <input type="date" ref={$birthday} />
            </label>
          </div>

          <div id="signUp-password">
            <label>
              <p>Пароль</p>
              <input type="password" ref={$password} />
            </label>

            <label className="label-right">
              <p>Подтвердите пароль</p>
              <input type="password" ref={$passwordConfirm} />
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
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
