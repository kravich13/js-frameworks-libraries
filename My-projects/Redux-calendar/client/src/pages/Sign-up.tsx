import React, { useEffect, useRef } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { req_signUp, hidden_navbar, actions_withAlert } from '../redux/actions'
import MyLogo from '../components/MyLogo'
import {
  IComponent_UserAuthorized,
  ImapDispatchToProps,
  IMapStateToProps,
} from '../interfaces'

const mapDispatchToProps: ImapDispatchToProps = {
  req_signUp,
  hidden_navbar,
  actions_withAlert,
}
const mapStateToProps = (state: IMapStateToProps) => {
  return { authorized: state.auth.authorized }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const SignUp: React.FC<PropsFromRedux> = ({
  authorized,
  req_signUp,
  hidden_navbar,
  actions_withAlert,
}) => {
  const $login = useRef<HTMLInputElement>(null)
  const $birthday = useRef<HTMLInputElement>(null)
  const $password = useRef<HTMLInputElement>(null)
  const $passwordConfirm = useRef<HTMLInputElement>(null)

  const signUpForm = (
    event: React.FormEvent<HTMLFormElement>
  ): void | string | Function => {
    event.preventDefault()

    const login: string = $login.current!.value
    const birthday: string = $birthday.current!.value
    const password: string = $password.current!.value
    const passwordConfirm: string = $passwordConfirm.current!.value

    const dateYear: number = new Date(birthday).getFullYear()
    if (!dateYear || dateYear < 1920 || dateYear > 2012) {
      return actions_withAlert('Неправильная дата рождения')
    }

    if (login.length < 3) {
      $login.current!.value = ''
      return ($login.current!.placeholder = 'Короткое имя')
    }
    if (password.length < 8) return actions_withAlert('Короткий пароль')
    if (passwordConfirm !== password) {
      return actions_withAlert('Неверный подтверждённый пароль')
    }

    req_signUp({ login, birthday, password, passwordConfirm })

    $login.current!.placeholder = 'Введите логин'
  }

  useEffect((): void => hidden_navbar(true), [hidden_navbar])

  useEffect((): void => {
    if (authorized) hidden_navbar(false)
  }, [hidden_navbar, authorized])

  function UserAuthorized({
    authorized,
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
