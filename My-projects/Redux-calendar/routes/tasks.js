const express = require('express')
const router = express.Router()
const { Work_DB } = require('../work.db')

router.post('/tasks', async (req, res) => {
  if (!req.body && req.headers['action-type']) {
    return res.json({ message: 'Неверный формат запроса, попробуйте ещё раз' })
  }

  const dateTask = new Date(req.body.timestamp)
  const correctMonth = new Date(dateTask.setDate(dateTask.getDate() + 1))

  if (req.headers['action-type'] === 'allTasks') {
    const tasksDatas = await Work_DB.all_tasks({
      user: req.body.userName,
      timestamp: +correctMonth
    })
    return res.json(tasksDatas)
  }

  if (req.headers['action-type'] === 'changeTask') {
    const changeTask = await Work_DB.change_tasks(req.body)
    return res.json(changeTask)
  }

  if (req.headers['action-type'] === 'createTask') {
    const dataCorrection = {
      user: req.body.userName,
      task: {
        id: req.body.id,
        timestamp: +correctMonth,
        title: req.body.title,
        posTop: req.body.posTop,
        posLeft: req.body.posLeft,
        height: req.body.height,
        position: req.body.position
      }
    }

    const userDataIs = await Work_DB.search_user(req.body.userName)

    if (userDataIs) {
      // Юзер существует
      const userObjPush = await Work_DB.push_newTask(dataCorrection)

      return_tasks(userObjPush)
    } else {
      // Новый юзер
      const userObjCreated = await Work_DB.createDocument_tasksUser(
        dataCorrection
      )

      return_tasks(userObjCreated)
    }

    function return_tasks(flag) {
      if (!flag)
        return return_tasks({ message: 'Неизвестная ошибка', task: null })
      return res.json({ message: 'Блок создан', task: dataCorrection.task })
    }
  }

  if (req.headers['action-type'] === 'deleteTask') {
    const idDel = await Work_DB.delete_task(req.body)
    return res.json({ id: idDel })
  }
})

module.exports = router
