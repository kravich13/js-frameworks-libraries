import React from 'react'
import { IFormAddTaskProps } from '../interfaces'

export const FormAddTask: React.FC<IFormAddTaskProps> = ({
  formAddTask,
  currentTime,
  titleValue,
  setTitleValue,
}) => {
  const date: Date = new Date()
  const timeEnd: string = `${date.getHours() + 1}:${date.getMinutes()}`

  return (
    <div id="block-addTask">
      <form onSubmit={(e) => formAddTask(e)}>
        <input
          type="text"
          placeholder="Заголовок"
          id="task-addTitle"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          name="title"
        />

        <label>
          <p>Начало:</p>
          <input type="time" defaultValue={currentTime} name="startTime" />
        </label>
        <label>
          <p>Конец:</p>
          <input type="time" defaultValue={timeEnd} name="endTime" />
        </label>
        <button id="task-save">Сохранить</button>
      </form>
    </div>
  )
}
