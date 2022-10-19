import React from 'react'
import { IListRooms_Props } from '../interfaces'
import '../styles/list-rooms.css'
import { Room } from './Room'

export const ListRooms: React.FC<IListRooms_Props> = ({
  rooms,
  clickLi,
  clickDelete,
}) => {
  return (
    <React.Fragment>
      {rooms.map((room) => {
        return (
          <Room
            key={room.id}
            clickLi={clickLi}
            clickDelete={clickDelete}
            {...room}
          />
        )
      })}
      {!rooms.length && <li>Комнаты отсутствуют.</li>}
    </React.Fragment>
  )
}
