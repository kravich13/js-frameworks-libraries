import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { hidden_navbar } from '../../redux/actions'
import { IComponent_UserAuthorized } from '../../interfaces'

interface IUserAuth_DispatchProps {
  hidden_navbar: (task: boolean) => Object
}

const mapDispatchToProps: IUserAuth_DispatchProps = { hidden_navbar }

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IComponent_UserAuthorized

const UserAuthorized: React.FC<Props> = ({ authorized, hidden_navbar }) => {
  useEffect(() => {
    authorized ? hidden_navbar(false) : hidden_navbar(true)
  }, [authorized, hidden_navbar])

  return !authorized ? null : <Redirect to="/" />
}

export default connect(null, mapDispatchToProps)(UserAuthorized)
