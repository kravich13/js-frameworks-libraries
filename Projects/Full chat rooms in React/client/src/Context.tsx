import React from 'react'
import { IContext } from './interfaces'

const Context = React.createContext<IContext>({
  stateAlert: '',
  hiddenAlert: false,
  setStateAlert: () => null,
  setHiddenALert: () => null,
})
export default Context
