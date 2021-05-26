import React from 'react'
import { IFormAddTaskProps } from '../interfaces'

export const FormAddTask: React.FC<IFormAddTaskProps> = ({
  formAddTask,
  addTitle,
  currentTime,
  startTask,
  endTask
}) => {
  const date: Date = new Date()
  const timeEnd = `${date.getHours() + 1}:${date.getMinutes()}`

  return (
    <div id="block-addTask">
      <form onSubmit={(e) => formAddTask(e)}>
        <input
          type="text"
          placeholder="Заголовок"
          id="task-addTitle"
          ref={addTitle}
        />

        <label>
          <p>Начало:</p>
          <input type="time" ref={startTask} defaultValue={currentTime} />
        </label>
        <label>
          <p>Конец:</p>
          <input type="time" ref={endTask} defaultValue={timeEnd} />
        </label>
        <button id="task-save">Сохранить</button>
      </form>
    </div>
  )
}
