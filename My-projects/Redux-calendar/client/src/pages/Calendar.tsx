import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { daysTasks, remove_daysTasks } from '../redux/actions'
import { Quarter } from '../components/Quarter'
import { IMapStateToProps, ICalendar_quarters } from '../interfaces'

const mapDispatchToProps = { daysTasks, remove_daysTasks }
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    authorized: state.auth.authorized,
    userName: state.auth.userName
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Calendar: React.FC<PropsFromRedux> = ({
  authorized,
  userName,
  daysTasks,
  remove_daysTasks
}) => {
  const date: Date = new Date()
  const currentYear: number = date.getFullYear()
  const [quarters] = useState<ICalendar_quarters[]>([
    { id: 1, month: [0, 1, 2] },
    { id: 2, month: [3, 4, 5] },
    { id: 3, month: [6, 7, 8] },
    { id: 4, month: [9, 10, 11] }
  ])

  useEffect((): void => {
    if (!authorized) {
      remove_daysTasks()
      return
    }

    daysTasks(userName)
  }, [daysTasks, remove_daysTasks, authorized, userName])

  return (
    <div id="fullCalendar">
      {!authorized && (
        <div id="calendar-auth">
          <p>Вы не авторизировались, основные функции недоступны.</p>
        </div>
      )}
      <div id="container-calendar">
        <h1>{currentYear}</h1>

        {quarters.map((block) => {
          return <Quarter key={block.id} quarter={block.month} />
        })}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
