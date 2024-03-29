import React from 'react'
import { IMessage_Props } from '../interfaces'
import '../styles/list-messages.css'

export const Message: React.FC<IMessage_Props> = ({ message }) => {
  const date: Date = new Date(message.createdAt)

  const month: string = message.newDay
    ? date.toLocaleString('en', { month: 'long' })
    : ''

  const hoursDB: number = date.getHours()
  const minDB: number = date.getMinutes()

  const finallyHours: string = hoursDB < 10 ? `0${hoursDB}` : hoursDB.toString()
  const finallyMinutes: string = minDB < 10 ? `0${minDB}` : minDB.toString()

  return (
    <React.Fragment>
      {message.newDay && (
        <div className="div-messageDate">
          <h3>
            {date.getDate()} {month} {date.getFullYear()}
          </h3>
        </div>
      )}
      <div className="div-message">
        <p>
          {message.user}: {message.message}
          <br />
          <span>
            {finallyHours}:{finallyMinutes}
          </span>
        </p>
      </div>
      <br />
    </React.Fragment>
  )
}
