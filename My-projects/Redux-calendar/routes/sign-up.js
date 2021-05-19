const express = require('express')
const router = express.Router()
const { check, matchedData } = require('express-validator')
const { Work_DB } = require('../work.db')

router.post(
  '/sign-up',
  [
    check('login').isLength({ min: 3, max: 21 }).bail(),
    check('birthday').isDate().bail(),
    check('password').isLength({ min: 8, max: 48 }).bail(),
    check('passwordConfirm').equals('password', 'passwordConfirm')
  ],
  async (req, res) => {
    if (!req.body) {
      return return_data('Неверный формат запроса, попробуйте ещё раз')
    }

    const matches = matchedData(req)
    if (!matches) return_data('Неверные данные')

    // ========== SENDIND DATA TO THE CLIENT ==========
    const { login, birthday, password } = req.body

    const userExists = await Work_DB.filtering_login(login)

    // New user
    if (!userExists) {
      const newUser = await Work_DB.create_user(login, password, birthday)

      // User added
      if (newUser) return_data('Успешная регистрация')
      else return_data('Неверные данные')
    } else return_data('Пользователь существует')

    function return_data(message) {
      res.json({ message })
    }
  }
)

module.exports = router
