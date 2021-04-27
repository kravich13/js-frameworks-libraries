import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Quarter } from '../components/Quarter'
import { IMapStateToProps, ICalendar_quarters } from '../interfaces'

const mapStateToProps = (state: IMapStateToProps) => {
  return {
    authorized: state.auth.authorized
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Calendar: React.FC<PropsFromRedux> = ({ authorized }) => {
  const date: Date = new Date()
  const currentYear: number = date.getFullYear()
  const [quarters] = useState<ICalendar_quarters[]>([
    { id: 1, month: [0, 1, 2] },
    { id: 2, month: [3, 4, 5] },
    { id: 3, month: [6, 7, 8] },
    { id: 4, month: [9, 10, 11] }
  ])

  return (
    <section>
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
    </section>
  )
}

export default connect(mapStateToProps)(Calendar)
