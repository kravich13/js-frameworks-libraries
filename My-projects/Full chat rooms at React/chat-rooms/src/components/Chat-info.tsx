import React, { useEffect, useState } from 'react'
import { IChatInfoProps } from '../interfaces'

export const ChatInfo: React.FC<IChatInfoProps> = ({ socket, clickRoom }) => {
  const [numberOfusers, setNumberOfusers] = useState<number>(0)
  const enterRoom = (event: React.KeyboardEvent<HTMLInputElement>): any => {
    if (event.code === 'Enter') {
      const et: any = event.target

      if (et.value === '') return (et.placeholder = 'Пустая строка')
      if (et.value.length < 3 || et.value.length > 32) {
        et.value = ''
        return (et.placeholder = 'От 3-х до 32-х символов')
      }
      socket.emit('addRoom', et.value)
      et.value = ''
    }
  }

  useEffect(() => {
    socket.on('numberOfUsers', async (count: number) => {
      try {
        setNumberOfusers(count)
      } catch (err) {
        alert('Произошла ошибка')
      }
    })
  }, [socket])

  return (
    <div id="chat-info">
      <div>
        <input
          onKeyDown={(event: any) => enterRoom(event)}
          type="text"
          placeholder="Введите название комнаты"
        />
      </div>
      <h3>
        {clickRoom} | Online: {numberOfusers}
      </h3>
    </div>
  )
}
