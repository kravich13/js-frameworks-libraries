import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/mobileNavbar.css'

export const MobileNavbar: React.FC = () => {
  const [flagRoomsOrChat, setFlagRoomsOrChat] = useState<boolean>(false)

  function hiddenMenu(flag: boolean) {
    setFlagRoomsOrChat(flag)
    const addRoom: HTMLElement | null =
      document.getElementById('container-addRoom')
    const blockRooms: HTMLElement | null =
      document.getElementById('block-rooms')

    if (!addRoom || !blockRooms) return

    const typeDisplay: string = flag ? 'flex' : ''

    addRoom.style.display = typeDisplay
    blockRooms.style.display = typeDisplay
    addRoom.style.width = '80%'
    blockRooms.style.width = '80%'
  }

  return (
    <ul id="mobile-navbar">
      <li>
        <NavLink to="/">Главная страница</NavLink>
      </li>
      <li>
        <NavLink to="/kravich">О проекте</NavLink>
      </li>
      <li onClick={() => hiddenMenu(!flagRoomsOrChat)}>
        <NavLink to="/rooms">
          {flagRoomsOrChat ? 'Скрыть список' : 'Список комнат '}
        </NavLink>
      </li>
    </ul>
  )
}
