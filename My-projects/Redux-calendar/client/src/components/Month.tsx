import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { change_monthNumber, req_daysTasks } from '../redux/actions'
import { Week } from './month/Week'
import { nanoid } from 'nanoid'
import {
  IMonth_DispatchProps,
  IClickMonth_passedProps,
  IMonth_stateWeeks,
  IMonth_arrWeeks,
  IMonth_objOfDay,
  IMonth_Moving,
} from '../interfaces'

const mapDispatchToProps: IMonth_DispatchProps = {
  change_monthNumber,
  req_daysTasks,
}
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IClickMonth_passedProps

const Month: React.FC<Props> = ({
  monthNumber,
  clickedMonth,
  authorized,
  daysTasks,
  userName,
  change_monthNumber,
  req_daysTasks,
}) => {
  const [stateWeeks, setStateWeeks] = useState<IMonth_stateWeeks[]>([])
  const [clickForYear, setClickForYear] = useState<boolean>(false)
  const titleH3: string[] = ['regular-month']
  const generalClasses: string[] = ['general-month']
  const containerOneMonth: string[] = ['container-oneMonth']
  const [daysOfWeek] = useState<string[]>([
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su',
  ])
  let classTD: string = 'dayOfYear'
  const currentMonth: number = new Date().getMonth()

  const year: number = new Date().getFullYear()
  const date: Date = new Date(year, monthNumber + 1, 0)
  const currentMonthTitle: string = date.toLocaleString('en', { month: 'long' })
  const firstDayOfMonth: number = new Date(year, monthNumber, 0).getDay()
  const numberOfMonth: number =
    33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()

  if (clickedMonth) {
    // Перекинуть на /month
    generalClasses.push('big-month')
    containerOneMonth.push('month-nope')

    classTD = authorized ? 'dayWithAuth' : 'dayWithoutAuth'
  }

  useEffect((): void => {
    // Если на большом месяце и массив тасков пуст
    if (clickedMonth && !daysTasks!.length) {
      req_daysTasks(userName)
    }
  }, [userName, clickedMonth, daysTasks, req_daysTasks])

  if (currentMonth === monthNumber) titleH3.push('current-month')

  useEffect((): void => {
    const arrWeeks: IMonth_arrWeeks = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    }
    let count: number = 0
    const totalNumberOfDays: number = numberOfMonth + firstDayOfMonth

    for (let i: number = 0; i < totalNumberOfDays; i++) {
      if (arrWeeks[count].length < 7) {
        if (i < firstDayOfMonth) arrWeeks[count].push(readyState(''))
        else arrWeeks[count].push(readyState(i - firstDayOfMonth + 1))
      } else arrWeeks[++count].push(readyState(i - firstDayOfMonth + 1))
    }

    const emptyDays: number = 7 - arrWeeks[count].length

    for (let i: number = 0; i < emptyDays; i++) {
      arrWeeks[count].push(readyState(''))
    }

    for (const key in arrWeeks) {
      if (!arrWeeks[key].length) delete arrWeeks[key]
      else {
        setStateWeeks((prev) => {
          return [...prev, { id: nanoid(), week: arrWeeks[key] }]
        })
      }
    }

    function readyState(value: number | string): IMonth_objOfDay {
      const numberDay: number = value ? +value : -1
      const fullDate: number | null =
        numberDay >= 0 ? +new Date(year, monthNumber, numberDay) : null
      return { day: value, fullDate: fullDate }
    }
  }, [firstDayOfMonth, numberOfMonth, currentMonth, monthNumber, year])

  function Moving({ flag }: IMonth_Moving): null | JSX.Element {
    if (authorized) return null
    if (flag) return <Redirect to="/month" />
    return null
  }

  return (
    <div
      className={generalClasses.join(' ')}
      onClick={() => {
        change_monthNumber(monthNumber)
        setClickForYear(true)
      }}
    >
      <Moving flag={clickForYear} />

      <div className={containerOneMonth.join(' ')}>
        <h3 className={titleH3.join(' ')}>{currentMonthTitle}</h3>

        <div className="container-bigMonth">
          {clickedMonth && (
            <ul>
              {daysOfWeek.map((elem: string, index: number) => {
                return <li key={index}>{elem}</li>
              })}
            </ul>
          )}
          <table>
            <tbody>
              {stateWeeks.map((elem, index: number) => {
                return (
                  <Week
                    key={index}
                    week={elem.week}
                    authorized={authorized}
                    classTD={classTD}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Month)
