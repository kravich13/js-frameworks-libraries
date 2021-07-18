import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { click_Month } from '../redux/actions'
import Month from '../components/Month'
import { ImapDispatchToProps, IMapStateToProps } from '../interfaces'

const mapDispatchToProps: ImapDispatchToProps = { click_Month }
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    authorized: state.auth.authorized,
    userName: state.auth.userName,
    monthNumber: state.auth.monthNumber,
    daysTasks: state.tasks.daysTasks,
    clickedMonth: state.auth.clickedMonth,
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const ClickMonth: React.FC<PropsFromRedux> = ({
  monthNumber,
  clickedMonth,
  authorized,
  userName,
  daysTasks,
  click_Month,
}) => {
  useEffect(() => click_Month(true), [click_Month])

  return (
    <Month
      monthNumber={monthNumber}
      authorized={authorized}
      clickedMonth={clickedMonth}
      userName={userName}
      daysTasks={daysTasks}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClickMonth)
