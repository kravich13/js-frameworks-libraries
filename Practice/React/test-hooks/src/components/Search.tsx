import React from 'react'

export const Search: React.FC<any> = ({ setValue }) => {
  return (
    <form onSubmit={(event): void => event.preventDefault()}>
      <input
        type="text"
        onChange={(event): void =>
          setValue((prev: string) => (prev = event.target.value))
        }
      />
    </form>
  )
}
