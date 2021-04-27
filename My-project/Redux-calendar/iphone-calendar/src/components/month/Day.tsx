import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { setDate_Day } from '../../redux/actions'
import {
  IDayProps,
  IComponent_UserAuthorized,
  IDay_DispatchProps
} from '../../interfaces'

const mapDispatchToProps: IDay_DispatchProps = { setDate_Day }
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IDayProps

const Day: React.FC<Props> = ({ elem, authorized, classTD, setDate_Day }) => {
  const { fullDate, day } = elem
  const classes: string[] = [classTD]

  if (fullDate?.toLocaleDateString() === new Date().toLocaleDateString()) {
    classes.push('current-day')
  }
  function TransitionTasks({ authorized }: IComponent_UserAuthorized): any {
    if (!authorized || !day) {
      return <React.Fragment>{day}</React.Fragment>
    }
    return <NavLink to="/month/events">{day}</NavLink>
  }

  function clickDay(): void {
    if (!authorized || day === '' || !fullDate) return
    setDate_Day(fullDate)
  }
  return (
    <td className={classes.join(' ')} onClick={clickDay}>
      <TransitionTasks authorized={authorized} />
    </td>
  )
}

export default connect(null, mapDispatchToProps)(Day)
