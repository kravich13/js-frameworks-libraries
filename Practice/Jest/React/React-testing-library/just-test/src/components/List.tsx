import React, { useState } from 'react'

export const List: React.FC = () => {
  const [news, setNews] = useState<any[]>([])
  const [error, setError] = useState<any | null>(null)

  const handleFetch = async () => {
    try {
      const result: Response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?post=5'
      )
      const jsonRes: any[] = await result.json()
      setNews(jsonRes)
    } catch (err) {
      setError(err)
    }
  }
  return (
    <div>
      <button data-testid="posts-click" onClick={handleFetch}>
        Новости
      </button>

      {error && <span>Что-то пошло не так...</span>}

      {news.map(({ title, id }) => {
        return <li key={id}>{title}</li>
      })}
    </div>
  )
}
