const express = require('express')
const router = express.Router()
const { check, matchedData } = require('express-validator')
const { Work_DB } = require('../work.db')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

router.post(
  '/sign-up',
  [
    check('login').isLength({ min: 3, max: 21 }).bail(),
    check('birthday').isDate().bail(),
    check('password').isLength({ min: 8, max: 48 }).bail(),
    check('passwordConfirm').equals('password', 'passwordConfirm')
  ],
  async (req, res) => {
    try {
      const matches = matchedData(req)
      if (!matches) return_data('Неверные данные')

      // ========== SENDIND DATA TO THE CLIENT ==========
      const { login, birthday, password } = req.body

      const userExists = await Work_DB.filtering_login(login)

      // New user
      if (!userExists) {
        const newUser = await Work_DB.create_user(login, password, birthday)

        // User added
        if (newUser) {
          const token = jwt.sign({ name: login }, secret, { expiresIn: '1h' })
          return_data('Успешная регистрация и авторизация', login, token)
        } else return_data('Неверные данные')
      } else return_data('Пользователь существует')
    } catch (err) {
      console.log(err)
      return return_data('Неверный формат запроса, попробуйте ещё раз')
    }

    function return_data(message, login = '', token = '') {
      res.json({ message, login, token })
    }
  }
)

module.exports = router
