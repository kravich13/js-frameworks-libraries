import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { IMapStateToProps } from '../interfaces'
import '../styles/alert.css'

const mapStateToProps = (state: IMapStateToProps) => {
  return {
    notification: state.notific.notification,
    hiddenAlert: state.notific.hiddenAlert,
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Alert: React.FC<PropsFromRedux> = ({ notification, hiddenAlert }) => {
  if (!hiddenAlert) return null

  return (
    <div id="container-notifications">
      <p title="Notifications">{notification}</p>
    </div>
  )
}

export default connect(mapStateToProps)(Alert)
