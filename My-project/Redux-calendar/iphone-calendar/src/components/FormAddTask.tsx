import React from 'react'
import { IFormAddTaskProps } from '../interfaces'

export const FormAddTask: React.FC<IFormAddTaskProps> = ({
  formAddTask,
  addTitle,
  currentTime,
  startTask,
  endTask
}) => {
  return (
    <div id="block-addTask">
      <form onSubmit={formAddTask}>
        <input
          type="text"
          placeholder="Заголовок"
          id="task-addTitle"
          ref={addTitle}
          // defaultValue="test"
        />

        <label>
          <p>Начало:</p>
          <input
            type="time"
            ref={startTask}
            defaultValue={currentTime}
            // defaultValue="00:00"
          />
        </label>
        <label>
          <p>Конец:</p>
          <input type="time" ref={endTask} defaultValue="01:00" />
        </label>
        <button id="task-save">Сохранить</button>
      </form>
    </div>
  )
}
