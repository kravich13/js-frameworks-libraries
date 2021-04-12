import React, { useContext } from 'react'
import { Month } from '../components/Month'
import { IContext } from '../interfaces'
import Context from '../context'

export const ClickMonth: React.FC = () => {
  const { stateMonth, generalStateMonth } = useContext<IContext>(Context)
  return <Month monthTitle={stateMonth} pressed={generalStateMonth} />
}
