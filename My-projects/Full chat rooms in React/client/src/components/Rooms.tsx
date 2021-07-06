import React, { useContext, useEffect, useRef, useState } from 'react'
import { IRoom, IRoomsProps } from '../interfaces'
import { ListRooms } from './List-rooms'
import { nanoid } from 'nanoid'
import Context from '../Context'
import '../styles/rooms.css'

const Rooms: React.FC<IRoomsProps> = ({ socket, loader, setClickRoom }) => {
  const { setStateAlert } = useContext(Context)
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [firstRoom, setFirstRoom] = useState<string>('none')
  const $previousRef = useRef<HTMLLIElement>()

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

        const arrRooms: string[] = await response.json()

        arrRooms.forEach((nameRoom: string, index: number) => {
          setRooms((prev) => {
            return [
              ...prev,
              {
                id: nanoid(),
                title: nameRoom,
                click: !index ?? false,
              },
            ]
          })
        })
        if (arrRooms.length) {
          setClickRoom(arrRooms[0])
          setFirstRoom(arrRooms[0])
        }
      } catch (err) {
        setStateAlert('Возникла ошибка получении всех комнат')
      }
    }
  }, [setClickRoom, setStateAlert])

  useEffect((): (() => void) => {
    let cleanupFunction: boolean = false

    socket.on('newRoom', async (nameRoom: string) => {
      if (cleanupFunction) return

      setRooms((prev) => {
        return [...prev, { id: nanoid(), title: nameRoom, click: false }]
      })
    })
    return (): void => {
      cleanupFunction = true
    }
  }, [socket, setRooms, setStateAlert])

  useEffect((): (() => void) => {
    let cleanupFunction: boolean = false

    socket.on('roomDeleted', (result: boolean, titleRoom: string) => {
      if (!result || cleanupFunction) return

      setRooms((prev) => {
        const newState: IRoom[] = []

        prev.forEach((elem) => {
          if (elem.title !== titleRoom) newState.push(elem)
        })

        if (newState[0]) newState[0].click = true
        return newState
      })

      setClickRoom(firstRoom)
    })
    return (): void => {
      cleanupFunction = true
    }
  }, [socket, setClickRoom, firstRoom])

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
        if (elem.id !== id && elem.click) return { ...elem, click: false }
        if (elem.id === id) return { ...elem, click: true }
        return elem
      })
    })

    setClickRoom(title)
  }

  const clickDelete = (title: string): void => {
    socket.emit('deleteRoom', title)
  }

  return (
    <div id="block-rooms">
      <ul>
        <ListRooms rooms={rooms} clickLi={clickLi} clickDelete={clickDelete} />
      </ul>
    </div>
  )
}

export default React.memo(Rooms)
