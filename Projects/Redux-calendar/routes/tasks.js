const express = require('express')
const router = express.Router()
const { Work_DB } = require('../work.db')

router.post('/tasks', async (req, res) => {
  try {
    if (!req.body && req.headers['action-type']) {
      return res.json({
        message: 'Неверный формат запроса, попробуйте ещё раз',
      })
    }

    const dateTask = new Date(req.body.timestamp)
    const correctMonth = new Date(dateTask.setDate(dateTask.getDate() + 1))

    if (req.headers['action-type'] === 'allTasks') {
      const tasksDatas = await Work_DB.all_tasks({
        user: req.body.userName,
        timestamp: +correctMonth,
      })
      return res.json(tasksDatas)
    }

    if (req.headers['action-type'] === 'changeTask') {
      const changeTask = await Work_DB.change_tasks(req.body)
      return res.json(changeTask)
    }

    if (req.headers['action-type'] === 'createTask') {
      const { userName, id, title, posTop, posLeft, height, position } =
        req.body

      const dataStructure = {
        user: userName,
        task: {
          id,
          timestamp: +correctMonth,
          title,
          posTop,
          posLeft,
          height,
          position,
        },
      }

      const userDataIs = await Work_DB.search_user(req.body.userName)

      if (userDataIs) {
        // Юзер существует
        const userObjPush = await Work_DB.push_newTask(dataStructure)
        return_tasks(userObjPush)
      } else {
        // Новый юзер
        const userObjCreated = await Work_DB.createDocument_tasksUser(
          dataStructure
        )

        return_tasks(userObjCreated)
      }

      function return_tasks(flag) {
        return flag
          ? res.json({ message: 'Блок создан', task: dataStructure.task })
          : res.json({ message: 'Неизвестная ошибка', task: null })
      }
    }

    if (req.headers['action-type'] === 'deleteTask') {
      const idDel = await Work_DB.delete_task(req.body)
      return res.json({ id: idDel })
    }
  } catch (err) {
    console.log(err)
    return res.json({ message: 'Возникла ошибка' })
  }
})

module.exports = router
