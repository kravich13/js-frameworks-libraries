const express = require('express')
const router = express.Router()
const { check, matchedData } = require('express-validator')
const { Work_DB } = require('../work.db')

router.post(
  '/daysTasks',
  [check('user').isLength({ min: 3, max: 21 })],
  async (req, res) => {
    try {
      const matches = matchedData(req)
      if (!matches) res.json({ message: 'Некорректные данные' })

      const countDays = await Work_DB.unique_day_task(req.body.user)

      return res.json(countDays)
    } catch (err) {
      console.log(err)
      return res.json({ message: 'Возникла ошибка при запросе' })
    }
  }
)

module.exports = router
