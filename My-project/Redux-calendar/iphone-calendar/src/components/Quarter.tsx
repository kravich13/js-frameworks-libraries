import React from 'react'
import Month from './Month'
import { IQuarterProps } from '../interfaces'

export const Quarter: React.FC<IQuarterProps> = ({ quarter }) => {
  return (
    <div className="quarters">
      {quarter.map((month, index: number) => {
        return <Month key={index} monthNumber={month} />
      })}
    </div>
  )
}
