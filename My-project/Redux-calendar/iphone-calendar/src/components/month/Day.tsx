import React from 'react'
import { NavLink } from 'react-router-dom'
// import { IDayProps } from '../../interfaces'

export const Day: React.FC<any> = ({ day, authorized, classTD }) => {
  const classes: string[] = [classTD]
  if (day.currentDay) classes.push('current-day')

  function TransitionTasks({ authorized }: any) {
    if (!authorized || !day.day) {
      return <React.Fragment>{day.day}</React.Fragment>
    }
    return <NavLink to="/month/events">{day.day}</NavLink>
  }
  return (
    <td
      className={classes.join(' ')}
      // onClick={() => clickDay(openFuncionality)}
    >
      <TransitionTasks authorized={authorized} />
    </td>
  )
}
