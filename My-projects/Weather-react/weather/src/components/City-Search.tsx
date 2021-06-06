import React, { ChangeEvent, FormEventHandler, useRef } from 'react'
// import TextField from '@material-ui/core/TextField'

export const CitySearch: React.FC<any> = ({
  searchForMatches,
  selectedItem,
  clickItem,
}) => {
  const $textField = useRef<HTMLInputElement>(null)

  const submitForm: FormEventHandler = (
    event: ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
  }

  if (clickItem) $textField.current!.value = selectedItem

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>
          <p>Enter the nаme of the city</p>
          <input
            type="text"
            placeholder="Search"
            defaultValue={selectedItem}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              searchForMatches(event.target.value)
            }
            ref={$textField}
          />
        </label>
      </form>
    </div>
  )
}
