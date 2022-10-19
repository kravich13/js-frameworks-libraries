import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { req_signUp, actions_withAlert } from '../redux/actions'
import MyLogo from '../components/MyLogo'
import { ImapDispatchToProps, IMapStateToProps } from '../interfaces'
import UserAuthorized from '../components/Redirect/User-Auth'

const mapDispatchToProps: ImapDispatchToProps = {
  req_signUp,
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
  actions_withAlert,
}) => {
  const [loginValue, setLoginValue] = useState<string>('')
  const [birthdayValue, setBirthdayValue] = useState<string>('')
  const [passOrigValue, setPassOrigValue] = useState<string>('')
  const [passCopyValue, setPassCopyValue] = useState<string>('')

  const signUpForm = (
    event: React.FormEvent<HTMLFormElement>
  ): void | string | Function => {
    event.preventDefault()

    const et = event.target as HTMLFormElement
    const $login = et.elements.namedItem('login') as HTMLInputElement

    const dateYear: number = new Date(birthdayValue).getFullYear()
    if (!dateYear || dateYear < 1920 || dateYear > 2012) {
      return actions_withAlert('Неправильная дата рождения')
    }

    if (loginValue.length < 3) {
      setLoginValue('')
      return ($login.placeholder = 'Короткое имя')
    }
    if (passOrigValue.length < 8) return actions_withAlert('Короткий пароль')
    if (passCopyValue !== passOrigValue) {
      return actions_withAlert('Неверный подтверждённый пароль')
    }

    req_signUp({
      login: loginValue,
      birthday: birthdayValue,
      password: passOrigValue,
      passwordConfirm: passCopyValue,
    })

    $login.placeholder = 'Введите логин'
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
              <input
                type="text"
                onChange={(e) => setLoginValue(e.target.value)}
                name="login"
              />
            </label>

            <label className="label-right">
              <p>Дата рождения</p>
              <input
                type="date"
                onChange={(e) => setBirthdayValue(e.target.value)}
              />
            </label>
          </div>

          <div id="signUp-password">
            <label>
              <p>Пароль</p>
              <input
                type="password"
                onChange={(e) => setPassOrigValue(e.target.value)}
              />
            </label>

            <label className="label-right">
              <p>Подтвердите пароль</p>
              <input
                type="password"
                onChange={(e) => setPassCopyValue(e.target.value)}
              />
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
