import React, { useState } from 'react'
import { Quarter } from '../components/Quarter'
import { ICalendar_quarters } from '../interfaces'
import { connect } from 'react-redux'

const Calendar: React.FC<any> = ({ authorized }) => {
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

const mapStateToProps = (state: any) => {
  return {
    authorized: state.auth.authorized
  }
}

export default connect(mapStateToProps, null)(Calendar)
