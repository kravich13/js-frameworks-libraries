import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { setDate_Day } from '../../redux/actions'
import {
  IDayProps,
  IComponent_UserAuthorized,
  IDay_DispatchProps,
  IMapStateToProps,
} from '../../interfaces'
import '../../styles/days.css'

const mapDispatchToProps: IDay_DispatchProps = { setDate_Day }
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IDayProps

const Day: React.FC<Props> = ({ elem, authorized, classTD, setDate_Day }) => {
  const { birthday, daysTasks } = useSelector((state: IMapStateToProps) => {
    return { daysTasks: state.tasks.daysTasks, birthday: state.tasks.birthday }
  })
  const { fullDate, day } = elem
  const classes: string[] = [classTD]
  let title: string = ''

  const dayElem: Date = new Date(fullDate!)
  const currentDay: string = new Date().toLocaleDateString()

  if (dayElem.toLocaleDateString() === currentDay) {
    title = 'Сегодняшний день'
    classes.push('current-day')
  }

  if (birthday) {
    const options: Intl.DateTimeFormatOptions = {
      month: 'numeric',
      day: 'numeric',
    }
    if (new Date(birthday).getMonth() === dayElem.getMonth()) {
      const elemDate: string = new Date(fullDate!).toLocaleString('en', options)
      const birthDate: string = new Date(birthday).toLocaleString('en', options)
      if (elemDate === birthDate) {
        title = 'Happy Birthday!'
        classes.push('happy-birthday')
      }
    }
  }

  if (`${fullDate}` in daysTasks) {
    const tasksToday: boolean = dayElem.toLocaleDateString() === currentDay
    title = tasksToday ? 'В сегодняшнем дне есть задачи' : 'Имеются задачи'
    classes.push(tasksToday ? 'current-day-withTasks' : 'there-are-tasks')
  }

  function TransitionTasks({
    authorized,
  }: IComponent_UserAuthorized): JSX.Element {
    return !authorized || !day ? (
      <React.Fragment>{day}</React.Fragment>
    ) : (
      <NavLink to="/month/events">{day}</NavLink>
    )
  }

  function clickDay(): void {
    if (!authorized || day === '' || !fullDate) return
    setDate_Day(fullDate)
  }
  return (
    <td className={classes.join(' ')} onClick={clickDay} title={title}>
      <TransitionTasks authorized={authorized} />
    </td>
  )
}

export default connect(null, mapDispatchToProps)(Day)
