import React from 'react'
import Day from './Day'
import { IWeekProps } from '../../interfaces'

export const Week: React.FC<IWeekProps> = ({ week, authorized, classTD }) => {
  return (
    <tr>
      {week.map((elem, index: number): JSX.Element => {
        return (
          <Day
            key={index}
            elem={elem}
            authorized={authorized}
            classTD={classTD}
          />
        )
      })}
    </tr>
  )
}
