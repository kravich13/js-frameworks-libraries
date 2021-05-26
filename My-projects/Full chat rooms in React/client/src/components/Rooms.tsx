import React, { useContext, useEffect, useRef, useState } from 'react'
import { IRoom, IRoomsProps } from '../interfaces'
import { ListRooms } from './List-rooms'
import { nanoid } from 'nanoid'
import Context from '../Context'
import '../styles/rooms.css'

const Rooms: React.FC<IRoomsProps> = ({ socket, loader, setClickRoom }) => {
  const { setStateAlert } = useContext(Context)
  const [rooms, setRooms] = useState<IRoom[]>([])
  const $previousRef = useRef<HTMLLIElement | null>(null)

  useEffect((): any => {
    let cleanupFunction = false
    socket.on('newRoom', async (nameRoom: string) => {
      try {
        if (!cleanupFunction) {
          setRooms((prev) => {
            return [
              ...prev,
              { id: nanoid(), title: nameRoom, click: false, hover: false },
            ]
          })
        }
      } catch (err) {
        setStateAlert('Возникла ошибка при получении комнат')
      }
    })
    return () => (cleanupFunction = true)
  }, [socket, setRooms, setStateAlert])

  useEffect((): void => {
    run()
    async function run() {
      try {
        const response = await fetch('/rooms', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ message: 'allRoom' }),
        })

        const arrNameRooms: string[] = await response.json()
        arrNameRooms.forEach((nameRoom: string, index: number) => {
          setRooms((prev) => {
            return [
              ...prev,
              {
                id: nanoid(),
                title: nameRoom,
                click: !index ?? false,
                hover: false,
              },
            ]
          })
        })
        if (arrNameRooms) setClickRoom(arrNameRooms[0])
      } catch (err) {
        setStateAlert('Возникла ошибка получении всех комнат')
      }
    }
  }, [setClickRoom, setStateAlert])

  const clickLi = async (
    event: React.ChangeEvent<
      HTMLLIElement | HTMLSpanElement | HTMLButtonElement
    >,
    id: string,
    ref: HTMLLIElement,
    title: string
  ) => {
    // Если тыкнул не на кнопку удаления, а на сам элемент li
    // Если нажал на тот же самый элемент
    // Если в процессе загрузки сообшений

    if (loader) return
    if (event.target.closest('button')) return
    if (event.target.closest('li') !== ref) return
    if ($previousRef.current === ref) return
    $previousRef.current = ref

    setRooms((prev) => {
      return prev.map((elem) => {
        if (elem.id !== id && elem.click) {
          // Не равен нажатому элементу и имеет покраску
          return { ...elem, click: false }
        }
        if (elem.id === id) {
          return elem.hover
            ? { ...elem, hover: false, click: true }
            : { ...elem, click: true }
        }
        return elem
      })
    })

    setClickRoom(title)
  }

  function overLi(id: string, flag: boolean): void {
    hover_event(id, flag)
  }
  function outLi(id: string, flag: boolean): void {
    hover_event(id, flag)
  }

  function hover_event(id: string, flag: boolean): void {
    setRooms((prev) => {
      return prev.map((elem) => {
        if (elem.id === id) {
          return elem.click ? elem : { ...elem, hover: flag }
        }
        return elem
      })
    })
  }

  const clickDelete = (title: string): void => {
    socket.emit('deleteRoom', title)
  }

  useEffect((): void => {
    socket.on('roomDeleted', (result: boolean, titleRoom: string) => {
      if (result) {
        setRooms((prev) => {
          return prev.filter((elem) => elem.title !== titleRoom)
        })
      }
    })
  }, [socket])

  return (
    <div id="block-rooms">
      <ul>
        {!rooms && <li>Комнаты отсутствуют.</li>}
        {rooms &&
          rooms.map((room) => {
            return (
              <ListRooms
                {...room}
                key={room.id}
                clickLi={clickLi}
                clickDelete={clickDelete}
                overLi={overLi}
                outLi={outLi}
              />
            )
          })}
      </ul>
    </div>
  )
}

export default React.memo(Rooms)
