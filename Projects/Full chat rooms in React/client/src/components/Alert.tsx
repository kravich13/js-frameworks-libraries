import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import '../styles/alert.css'

export const Alert: React.FC = () => {
  const { stateAlert, setHiddenALert } = useContext(Context)

  useEffect((): void => {
    setTimeout(() => setHiddenALert(false), 3000)
  }, [setHiddenALert])

  return <div id="Alert">{<p>{stateAlert}</p>}</div>
}
