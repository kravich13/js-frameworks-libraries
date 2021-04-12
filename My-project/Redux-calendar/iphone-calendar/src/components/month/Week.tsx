import React from 'react'
import { Day } from './Day'
import { IWeekProps } from '../../interfaces'

export const Week: React.FC<IWeekProps> = ({ week, propsDay }) => {
  return (
    <tr>
      {week.map((elem: any, index: number) => {
        return <Day key={index} day={elem} openFuncionality={propsDay} />
      })}
    </tr>
  )
}
