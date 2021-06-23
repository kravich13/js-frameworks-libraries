import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { List } from './List'

describe('test', () => {
  test('qq', () => {
    const { getByTestId } = render(<List />)

    const $button: any = getByTestId('posts-click')
    expect($button).toBeInTheDocument()
  })
})
