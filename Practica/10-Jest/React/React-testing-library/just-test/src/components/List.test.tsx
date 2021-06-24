import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { List } from './List'

describe('List test', () => {
  it('qq', async () => {
    const { getByTestId, findAllByRole } = render(<List />)

    // нажали на кнопку и получили список листов
    const $button = getByTestId('posts-click') as HTMLButtonElement
    userEvent.click($button)

    // длинна массива листво - 100, как и заявлено
    const $listItems = (await findAllByRole('listitem')) as HTMLLIElement[]
    expect($listItems).toHaveLength(100)
  })
})
