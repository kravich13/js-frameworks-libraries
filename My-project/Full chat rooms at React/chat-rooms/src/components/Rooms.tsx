import React, { useEffect, useRef, useState } from 'react'
import { IRoom, IRoomsProps } from '../interfaces'
import { ListRooms } from '../components/List-rooms'
import { nanoid } from 'nanoid'

export const Rooms: React.FC<IRoomsProps> = ({
  socket,
  chatRequest,
  setMessages
}) => {
  const [rooms, setRooms] = useState<any>([])
  const $previousRef = useRef<any>(null)

  useEffect(() => {
    run()
    async function run() {
      const response = await fetch('/rooms', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ message: 'all room' })
      })

      const arrNameRooms = await response.json()

      arrNameRooms.forEach((nameRoom: string, index: number) => {
        setRooms((prev: any) => {
          return [
            ...prev,
            {
              id: nanoid(),
              title: nameRoom,
              click: !index ? true : false,
              hover: false
            }
          ]
        })
      })
    }
  }, [])

  useEffect((): any => {
    let cleanupFunction = false
    socket.on('newRoom', (nameRoom: string) => {
      if (!cleanupFunction) {
        setRooms((prev: any) => {
          return [
            ...prev,
            { id: nanoid(), title: nameRoom, click: false, hover: false }
          ]
        })
      }
    })
    return () => (cleanupFunction = true)
  }, [socket])

  const clickLi = async (
    event: React.MouseEvent<HTMLLIElement>,
    id: string,
    ref: any,
    title: string
  ) => {
    // Если тыкнул не на кнопку удаления, а на сам элемент li
    // Если нажал на тот же самый элемент
    if (event.target !== ref) return
    if ($previousRef.current === ref) return
    $previousRef.current = ref

    setRooms((prev: IRoom[]) => {
      return prev.map((elem) => {
        if (elem.id !== id && elem.click) {
          // Не равен нажатому элементу и имеет покраску
          return {
            ...elem,
            click: false
          }
        }
        if (elem.id === id) {
          if (elem.hover) {
            return {
              ...elem,
              hover: false,
              click: true
            }
          }
          return {
            ...elem,
            click: true
          }
        }
        return elem
      })
    })

    const arrMessages: IRoom[] = await chatRequest(title)
    setMessages([...arrMessages])
  }

  function overLi(id: string): void {
    setRooms((prev: IRoom[]) => {
      return prev.map((elem) => {
        if (elem.id === id) {
          if (elem.click) {
            return {
              ...elem
            }
          }
          return {
            ...elem,
            hover: true
          }
        }
        return elem
      })
    })
  }
  function outLi(id: string): void {
    setRooms((prev: IRoom[]) => {
      return prev.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            hover: false
          }
        }
        return elem
      })
    })
  }

  const clickDelete = (id: string): void => {
    setRooms((prev: IRoom[]) => {
      return prev.filter((elem) => elem.id !== id)
    })
  }

  return (
    <div id="block-rooms">
      <ul>
        {!rooms && <li>Комнаты отсутствуют.</li>}
        {rooms &&
          rooms.map((room: IRoom) => {
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
