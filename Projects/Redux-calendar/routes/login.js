const express = require('express')
const router = express.Router()
const { check, matchedData } = require('express-validator')
const { Work_DB } = require('../work.db')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

router.post(
  '/login',
  [
    check('name').isLength({ min: 3, max: 21 }).bail(),
    check('password').isLength({ min: 8, max: 48 }),
  ],
  async (req, res) => {
    try {
      const matches = matchedData(req)
      if (!matches) return_data('Неверные данные')

      const { name, password } = req.body

      const autoLogin = await Work_DB.login_details_match(name, password)

      if (!autoLogin) return return_data('Неверное имя пользователя или пароль')

      const token = jwt.sign({ name }, secret, { expiresIn: '1h' })
      return return_data('Вы успешно авторизировались!', autoLogin, token)
    } catch (err) {
      return return_data('Возникла ошибка')
    }

    function return_data(message, login = '', token = '') {
      res.json({ message, login, token })
    }
  }
)

module.exports = router
