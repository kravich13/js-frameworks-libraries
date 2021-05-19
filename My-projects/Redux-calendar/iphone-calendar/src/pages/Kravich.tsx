import React from 'react'

export const Kravich: React.FC = () => {
  return (
    <div className="navbar-a about-project">
      <h3>Немного о полном календаре с задачами на дне: </h3>
      <ul>
        <li>
          Описание:
          <ul>
            <li>Полный календарь за весь год</li>
            <li>Присутствует система регистрации и авторизации</li>
            <li>Реализован функционал добавления/удаления тасков</li>
          </ul>
        </li>

        <li>
          Node JS:
          <ul>
            <li>Сервер на Express</li>
            <li>БД - MongoDB и Mongoose</li>
          </ul>
        </li>
        <li>
          React && Redux:
          <ul>
            <li>Написан на Redux</li>
            <li>Написан на Hooks </li>
            <li>Написан на TypeScript</li>
            <li>Вся верстка на display: flex;</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
