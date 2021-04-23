import React, { useEffect } from 'react'
import Month from '../components/Month'
// import { IContext } from '../interfaces'
import { connect } from 'react-redux'
import { click_Month } from '../redux/actions'

const ClickMonth: React.FC<any> = ({
  monthNumber,
  clickedMonth,
  authorized,
  click_Month
}) => {
  useEffect(() => {
    click_Month(true)
  }, [click_Month])

  return (
    <Month
      monthNumber={monthNumber}
      authorized={authorized}
      clickedMonth={clickedMonth}
    />
  )
}

const mapDispatchToProps = { click_Month }
const mapStateToProps = (state: any) => {
  return {
    authorized: state.auth.authorized,
    monthNumber: state.auth.monthNumber,
    clickedMonth: state.auth.clickedMonth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClickMonth)
