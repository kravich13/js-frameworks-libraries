import React, { useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Week } from './month/Week'
import { nanoid } from 'nanoid'
import {
  // IMonthProps,
  IMonth_stateWeeks,
  IMonth_arrWeeks,
  IMonth_objOfDay
} from '../interfaces'
import { connect } from 'react-redux'
import { change_monthNumber } from '../redux/actions'

const Month: React.FC<any> = ({
  monthNumber,
  clickedMonth,
  authorized,
  change_monthNumber
}) => {
  const [clickForYear, setClickForYear] = useState(false)
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
    'Su'
  ])
  let classTD: string = 'dayOfYear'

  if (clickedMonth) {
    // Перекинуть на /month
    generalClasses.push('big-month')
    containerOneMonth.push('month-nope')

    classTD = authorized ? 'dayWithAuth' : 'dayWithoutAuth'
  }

  const [stateWeeks, setStateWeeks] = useState<IMonth_stateWeeks[]>([])
  const $divMonth = useRef<any>(null)

  const currentMonth: number = new Date().getMonth()
  if (currentMonth === monthNumber) titleH3.push('current-month')

  const year: number = new Date().getFullYear()
  const date: Date = new Date(year, monthNumber + 1, 0)
  const currentMonthTitle = date.toLocaleString('en', { month: 'long' })
  const firstDayOfMonth: number = new Date(year, monthNumber, 0).getDay()
  const numberOfMonth: number =
    33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()

  useEffect(() => {
    const arrWeeks: IMonth_arrWeeks = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
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
          return [
            ...prev,
            {
              id: nanoid(),
              week: arrWeeks[key]
            }
          ]
        })
      }
    }

    function readyState(value: number | string): IMonth_objOfDay {
      const currentDay: number = new Date().getDate()
      return {
        day: value,
        currentDay: currentMonth === monthNumber && value === currentDay
      }
    }
  }, [firstDayOfMonth, numberOfMonth, currentMonth, monthNumber])

  function Moving({ flag }: any) {
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
      ref={$divMonth}
    >
      <Moving flag={clickForYear} />

      <div className={containerOneMonth.join(' ')}>
        <h3 className={titleH3.join(' ')}>{currentMonthTitle}</h3>

        <div className="container-bigMonth">
          {/* Если /month - дорисовать дни недели*/}
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

const mapDispatchToProps = { change_monthNumber }

export default connect(null, mapDispatchToProps)(Month)
