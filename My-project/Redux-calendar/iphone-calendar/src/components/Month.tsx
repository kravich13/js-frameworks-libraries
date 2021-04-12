import React, { useEffect, useRef, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Week } from './month/Week'
import { nanoid } from 'nanoid'
import {
  IMonthProps,
  IMonth_stateWeeks,
  IMonth_arrWeeks,
  IMonth_objOfDay,
  IContext
} from '../interfaces'
import Context from '../context'

export const Month: React.FC<IMonthProps> = ({ monthTitle, pressed }) => {
  const { authorized, clickOnMonth } = useContext<IContext>(Context)
  let urlAdress: string = '/month'
  const titleH3: string[] = ['regular-month']
  const generalClasses: string[] = ['general-month']
  const defaultStyleNavlink: string[] = ['month-navLink']
  const [daysOfWeek] = useState<string[]>([
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su'
  ])

  if (pressed) {
    // Если перешел по клику в месяц - добавить стили
    generalClasses.push('big-month')
    defaultStyleNavlink.push('month-nope')

    // Если ещё авторизован - открыть доп. функционал по переходу
    if (authorized) urlAdress = '/month/events'
  }

  const [stateWeeks, setStateWeeks] = useState<IMonth_stateWeeks[]>([])
  const $divMonth = useRef<any>(null)

  const currentMonth: number = new Date().getMonth()
  if (currentMonth === monthTitle) titleH3.push('current-month')

  const year: number = new Date().getFullYear()
  const date: Date = new Date(year, monthTitle + 1, 0)
  const currentMonthTitle = date.toLocaleString('en', { month: 'long' })
  const firstDayOfMonth: number = new Date(year, monthTitle, 0).getDay()
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
        currentDay: currentMonth === monthTitle && value === currentDay
      }
    }
  }, [firstDayOfMonth, numberOfMonth, currentMonth, monthTitle])

  return (
    <div
      className={generalClasses.join(' ')}
      onClick={() => clickOnMonth(monthTitle)}
      ref={$divMonth}
    >
      <NavLink to={urlAdress} className={defaultStyleNavlink.join(' ')}>
        <h3 className={titleH3.join(' ')}>{currentMonthTitle}</h3>

        <div className="container-bigMonth">
          {/* Если /month - дорисовать дни недели*/}
          {pressed && (
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
                  <Week key={index} week={elem.week} propsDay={urlAdress} />
                )
              })}
            </tbody>
          </table>
        </div>
      </NavLink>
    </div>
  )
}
