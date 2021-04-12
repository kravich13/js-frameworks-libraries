import React, { useContext } from 'react'
import { IDayProps, IContext } from '../../interfaces'
import Context from '../../context'

export const Day: React.FC<IDayProps> = ({ day, openFuncionality }) => {
  const { clickDay } = useContext<IContext>(Context)
  const classes: string[] = ['regular-day']
  if (day.currentDay) classes.push('current-day')

  return (
    <td
      className={classes.join(' ')}
      onClick={() => clickDay(openFuncionality)}
    >
      {day.day}
    </td>
  )
}
