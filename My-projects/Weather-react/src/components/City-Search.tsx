import React, { useEffect, useRef } from 'react'
import { ICitySearch_Props } from '../interfaces'

export const CitySearch: React.FC<ICitySearch_Props> = ({
  clickedItem,
  item_selection_arrow,
  searchForMatches,
  enteredCity,
}) => {
  const $textField = useRef<HTMLInputElement>(null)

  const submitForm: React.FormEventHandler = (
    event: React.ChangeEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    if ($textField.current!.value.length < 2) return
    enteredCity({ id: clickedItem.id, title: clickedItem.title })
  }

  const keyDown: React.KeyboardEventHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const code: string = event.code

    if (code === 'ArrowUp' || code === 'ArrowDown') {
      event.preventDefault()
      item_selection_arrow(code)
    }
  }

  useEffect((): void => {
    if (clickedItem.default) return // the first elem from search

    $textField.current!.value = clickedItem.title
    $textField.current!.focus()
    $textField.current!.select()
  }, [clickedItem])

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>
          <p>Enter the nаme of the city</p>
          <input
            type="text"
            placeholder="Search"
            defaultValue={clickedItem.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              searchForMatches(event.target.value)
            }
            onKeyDown={keyDown}
            ref={$textField}
          />
        </label>
      </form>
    </div>
  )
}
