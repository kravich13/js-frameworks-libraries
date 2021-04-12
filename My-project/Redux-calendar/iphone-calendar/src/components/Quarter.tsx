import React, { useContext } from 'react'
import { Month } from './Month'
import { IQuarterProps, IContext } from '../interfaces'
import Context from '../context'

export const Quarter: React.FC<IQuarterProps> = ({ quarter }) => {
  const { generalStateMonth } = useContext<IContext>(Context)
  return (
    <div className="quarters">
      {quarter.map((month, index: number) => {
        return (
          <Month key={index} monthTitle={month} pressed={generalStateMonth} />
        )
      })}
    </div>
  )
}
