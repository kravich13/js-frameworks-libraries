import React, { useCallback, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import MyLogo from '../components/MyLogo'
import { connect } from 'react-redux'
import { req_singUp, req_clearMessage, hidden_navbar } from '../redux/actions'

const SingUp: React.FC<any> = ({
  req_singUp,
  eventSingUpAuth,
  req_clearMessage,
  hidden_navbar
}) => {
  const $login = useRef<any>(null)
  const $birthday = useRef<any>(null)
  const $password = useRef<any>(null)
  const $passwordConfirm = useRef<any>(null)

  const singUpForm = (event: React.FormEvent<HTMLFormElement>): any => {
    event.preventDefault()

    const login = $login.current.value
    const birthday = $birthday.current.value
    const password = $password.current.value
    const passwordConfirm = $passwordConfirm.current.value

    if (login.length < 3) return ($login.current.placeholder = 'Короткое имя')
    if (!birthday) return alert('Неправильная дата рождения')

    if (password.length < 8) return alert('Короткий пароль')
    if (passwordConfirm !== password)
      return alert('Неверный подтверждённый пароль')

    req_singUp({
      login,
      birthday,
      password,
      passwordConfirm
    })
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
  }, [eventSingUpAuth, clearEvents])

  return (
    <React.Fragment>
      <MyLogo trueNavbar={true} />

      <div id="window-registation">
        <h2>Создать аккаунт</h2>

        <form id="form-sing-up" onSubmit={singUpForm}>
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

          <div id="singUp-password">
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
    </React.Fragment>
  )
}

const mapDispatchToProps = { req_singUp, req_clearMessage, hidden_navbar }
const mapStateToProps = (state: any) => {
  return {
    eventSingUpAuth: state.auth.eventSingUpAuth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUp)
