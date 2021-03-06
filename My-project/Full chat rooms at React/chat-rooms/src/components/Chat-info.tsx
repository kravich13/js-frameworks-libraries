import React from 'react'

export const ChatInfo: React.FC = () => {
  const enterRoom = (event: React.KeyboardEvent<HTMLInputElement>): any => {
    if (event.code === 'Enter') {
      const et: any = event.target

      if (et.value === '') return (et.placeholder = 'Пустая строка')
      if (et.value.length < 3 || et.value.length > 32) {
        et.value = ''
        return (et.placeholder = 'От 3-х до 32-х символов')
      }
    }
  }
  return (
    <div id="chat-info">
      <div>
        <input onKeyDown={(event: any) => enterRoom(event)} type="text" />
      </div>
      <h3>Noname | Online: 0</h3>
    </div>
  )
}
