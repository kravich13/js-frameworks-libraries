import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { setDate_Day } from '../../redux/actions'
import {
  IDayProps,
  IComponent_UserAuthorized,
  IDay_DispatchProps,
  IMapStateToProps
} from '../../interfaces'

const mapDispatchToProps: IDay_DispatchProps = { setDate_Day }
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IDayProps

const Day: React.FC<Props> = ({ elem, authorized, classTD, setDate_Day }) => {
  const daysTasks = useSelector((state: IMapStateToProps) => {
    return state.tasks.daysTasks
  })
  const { fullDate, day } = elem
  const classes: string[] = [classTD]

  const dayElem: string = new Date(fullDate!).toLocaleDateString()
  const currentDay: string = new Date().toLocaleDateString()

  if (dayElem === currentDay) classes.push('current-day')

  daysTasks.forEach((elem: number): any => {
    if (fullDate === elem) {
      if (dayElem === currentDay) return classes.push('current-day-withTasks')
      return classes.push('there-are-tasks')
    }
  })

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
