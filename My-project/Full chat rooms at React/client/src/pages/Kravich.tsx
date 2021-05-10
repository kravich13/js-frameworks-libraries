import React from 'react'

export const Kravich: React.FC = () => {
  return (
    <div className="navbar-a about-project">
      <h3>Немного о чате: </h3>
      <ul>
        <li>
          Node JS:
          <ul>
            <li>Сервер на Express</li>
            <li>Использован socket.io</li>
            <li>БД - MongoDB и Mongoose</li>
          </ul>
        </li>
        <li>
          React:
          <ul>
            <li>Написан на Hooks </li>
            <li>Написан на TypeScript</li>
            <li>Также использован socket.io</li>
            <li>
              Поскольку на момент написания не знал Redux - применил useContext
            </li>
            <li>Вся верстка на display: flex;</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
