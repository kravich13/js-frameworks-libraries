import React from 'react'
import { styleFinally, IListMessagesProps } from '../interfaces'

const styles: styleFinally = {
  messageMain: {
    fontSize: '17px',
    width: 'auto',
    display: 'inline-block',
    background: 'rgba(255, 0, 0, 0.13)',
    border: '1px solid lightblue',
    borderRadius: '8px',
    padding: '5px 15px',
    marginBottom: '5px',
    textAlign: 'end'
  },
  spanDate: {
    fontSize: '15px'
  },
  newDayBlock: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '5px'
  },
  newDay: {
    fontSize: '17px',
    fontWeight: '700',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.63)',
    padding: '5px 13px',
    borderRadius: '13px'
  }
}

export const ListMessages: React.FC<IListMessagesProps> = ({ message }) => {
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
        <div style={styles.newDayBlock}>
          <h3 style={styles.newDay}>
            {date.getDate()} {month} {date.getFullYear()}
          </h3>
        </div>
      )}
      <div style={styles.messageMain}>
        <p>
          {message.user}: {message.message}
          <br />
          <span style={styles.spanDate}>
            {finallyHours}:{finallyMinutes}
          </span>
        </p>
      </div>
      <br />
    </React.Fragment>
  )
}
