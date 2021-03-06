import React, { useEffect } from 'react'

export const Rooms: React.FC = () => {
  // const [rooms, setRooms] = useState<any>(null)

  useEffect(() => {
    const obj = {
      message: 'all room'
    }
    // run()
    async function run() {
      const response = await fetch('/rooms', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })

      const arrRoom = response.json()
      console.log(await arrRoom)
    }
  }, [])

  return (
    <div id="block-rooms">
      <ul>
        <li>Комнаты отсутствуют</li>
        <li>Комнаты отсутствуют</li>
      </ul>
    </div>
  )
}
