import React, { useState, useContext } from 'react'
import Context from '../context'

const styles = {
  div: {
    width: '300px',
    color: 'white',
    background: 'rgba(192, 0, 0, 0.568)'
  },
  divInput: {
    textAlign: 'center',
    padding: '10px 0'
  },
  input: {
    width: '230px',
    background: 'rgba(192, 0, 0, 0.568)',
    border: '1px solid grey',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 600,
    outline: 'none',
    height: '38px'
  },
  deleteX: {
    color: 'black',
    border: '1px solid black',
    borderRadius: '50%',
    padding: '1px 3px',
    fontSize: '13px',
    background: 'rgba(192, 0, 0, 0.25)'
  }
}

export default function Rooms() {
  const defaultList = [
    { id: 1, nameRoom: 'Общий чат', complited: false, deleteX: false },
    { id: 2, nameRoom: 'Maksym', complited: false, deleteX: false },
    { id: 3, nameRoom: 'Трейдинг', complited: false, deleteX: false },
    { id: 4, nameRoom: 'Vlad', complited: false, deleteX: false }
  ]

  const [rooms, setRooms] = useState(defaultList)

  function LiRoom(room) {
    const { clickRoom } = useContext(Context)
    let classLi = ''
    const elem = room.args

    elem.complited ? (classLi = 'done1') : (classLi = 'done')
    return (
      <li
        // onClick={() => clickRoom(elem.id)}
        className={classLi}
      >
        {elem.nameRoom}

        <p
          style={{ padding: '0 5px', cursor: 'pointer' }}
          onClick={() => clickRoom(elem.id, true)}
        >
          <span style={styles.deleteX}>&#10006;</span>
        </p>
      </li>
    )
  }

  // function clickRoom(id, deleteTrue = false) {
  //   if (deleteTrue) {
  //     setRooms(
  //       rooms.filter((room) => {
  //         return room.id !== id
  //       })
  //     )
  //     return
  //   }

  //   // setRooms(
  //   //   rooms.map((room) => {
  //   //     if (room.complited) room.complited = !room.complited

  //   //     if (room.id === id) {
  //   //       room.complited = !room.complited
  //   //     }
  //   //     return room
  //   //   })
  //   // )
  // }

  // function clickDelete(id) {
  //   setRooms(
  //     rooms.filter((room) => {
  //       return room.id !== id
  //     })
  //   )
  // }

  function enterRoom(event) {
    if (event.code === 'Enter') {
      const et = event.target

      if (et.value === '') return (et.placeholder = 'Пустая строка')
      if (et.value.length < 3 || et.value.length > 32) {
        et.value = ''
        return (et.placeholder = 'От 3-х до 32-х символов')
      }

      setRooms([
        ...rooms,
        {
          id: Date.now(),
          nameRoom: et.value,
          complited: false,
          deleteX: false
        }
      ])

      et.value = ''
      et.placeholder = 'Название и Enter'
    }
  }

  return (
    <div style={styles.div}>
      <div style={styles.divInput}>
        <input
          onKeyDown={enterRoom}
          style={styles.input}
          type="text"
          id="addRoom"
          placeholder="Название и Enter"
        />
      </div>

      <ul>
        {rooms.map((room) => {
          return <LiRoom args={room} key={room.id} />
        })}
      </ul>
    </div>
  )
}
