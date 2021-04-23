import React from 'react'
import { Day } from './Day'
// import { IWeekProps } from '../../interfaces'

export const Week: React.FC<any> = ({ week, authorized, classTD }) => {
  return (
    <tr>
      {week.map((elem: any, index: number) => {
        return (
          <Day
            key={index}
            day={elem}
            authorized={authorized}
            classTD={classTD}
          />
        )
      })}
    </tr>
  )
}
