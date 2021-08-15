import React from 'react'

export const Title: React.FC = () => {
  const pathName: string = window.location.pathname

  switchToPath(pathName)

  function switchToPath(pathName: string): void {
    switch (pathName) {
      case '/kate':
        setTitle('Kate')
        break
      case '/max':
        setTitle('Max')
        break
      case '/':
        setTitle('Vlad')
        break
      default:
        document.title = 'Error'
    }
  }

  function setTitle(pathName: string): void {
    document.title = `That is ${pathName}`
  }

  window.onpopstate = (): void => {
    const pathName: string = document.location.pathname

    switchToPath(pathName)

    // === event state - it's args of URL ===
    // console.log(
    //   `location: ${document.location}, state: ${JSON.stringify(event.state)}`
    // )
  }

  return null
}
