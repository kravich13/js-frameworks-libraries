const express = require('express')
const router = express.Router()
const { check, matchedData } = require('express-validator')
const { Work_DB } = require('../work.db')

router.post(
  '/daysTasks',
  [check('user').isLength({ min: 3, max: 21 })],
  async (req, res) => {
    if (!req.body) res.json({ message: 'Возникла ошибка при запросе' })

    const matches = matchedData(req)
    if (!matches) res.json({ message: 'Некорректные данные' })

    const countDays = await Work_DB.unique_day_task(req.body.user)

    res.json(countDays)
  }
)

module.exports = router
