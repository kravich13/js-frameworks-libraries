import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  beforeEach(async () => {
    const { getByTestId } = render(<App />)
    await screen.findByText(/Logged in as/i)
  })

  it('renders to the text', () => {
    expect(screen.getByText(/hello/i)).toBeInTheDocument()
    expect(screen.getByText(/Какая-то инфа/i)).toBeInTheDocument()
  })

  it.skip('renders to search types', async () => {
    const { getByTestId } = render(<App />)
    await screen.findByText(/Logged in as/i)

    const $button = getByTestId('buttonApp-click') as HTMLButtonElement

    // expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
    expect($button).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Текст...')).toBeInTheDocument()
    expect(screen.getByAltText('нет картинки')).toBeInTheDocument()
    expect(screen.getByDisplayValue('13')).toBeInTheDocument()
  })
  it('renders to search variants', () => {
    expect(screen.queryByText(/Max Kravich/i)).toBeNull()
  })
  it('approval elements', () => {
    expect(screen.getByText(/Привет/i)).toHaveClass('classTest')
    expect(screen.getByText(/Ку/i)).toHaveAttribute('id')
  })
  it('renders async elem', async () => {
    // Изначательно строки нет
    // expect(screen.queryByText(/Logged in as/i)).toBeNull()
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument()
  })
})

describe('fireEvents', () => {
  let $button: HTMLButtonElement | null = null

  beforeEach(async () => {
    const { getByTestId } = render(<App />)
    await screen.findByText(/Logged in as/i)

    $button = getByTestId('buttonApp-click') as HTMLButtonElement
  })

  test('emulation click', () => {
    screen.findByText(/kravich/i)
    expect(screen.queryByText(/Max Kravich/i)).toBeNull()
    fireEvent.click($button!)
    expect(screen.queryByText(/Max Kravich/i)).toBeInTheDocument()
  })
})

// describe('fire events', () => {
//   it('checkbox click', () => {
//     const handleChange = jest.fn()
//     const { container } = render(
//       <input type="checkbox" onChange={handleChange} />
//     )
//     const checkbox: ChildNode | null = container.firstChild

//     // не выбран
//     expect(checkbox).not.toBeChecked()

//     fireEvent.click(checkbox!)

//     // выбран
//     expect(checkbox).toBeChecked()
//   })

//   it('input focus', () => {
//     const { getByTestId } = render(
//       <input type="checkbox" data-testid="focus-test" />
//     )

//     const input: HTMLElement = getByTestId('focus-test')
//     expect(input).not.toHaveFocus()
//     input.focus()
//     expect(input).toHaveFocus()
//   })
// })

// describe('user events', () => {
//   it('checkbox click', () => {
//     const handleChange = jest.fn()
//     const { container } = render(
//       <input type="checkbox" onChange={handleChange} />
//     )
//     const checkbox: ChildNode | any = container.firstChild

//     expect(checkbox).not.toBeChecked()
//     userEvent.click(checkbox, { ctrlKey: true, shiftKey: true })
//     expect(checkbox).toBeChecked()
//   })

//   it('double click', () => {
//     const onChange = jest.fn()
//     const { container } = render(<input type="checkbox" onChange={onChange} />)
//     const checkbox: ChildNode | any = container.firstChild

//     expect(checkbox).not.toBeChecked()
//     userEvent.dblClick(checkbox)

//     // вызвали 2 раза
//     expect(onChange).toHaveBeenCalledTimes(2)
//   })

//   it('input focus', () => {
//     const { getAllByTestId } = render(
//       <div>
//         <input data-testid="elem" type="checkbox" />
//         <input data-testid="elem" type="radio" />
//         <input data-testid="elem" type="number" />
//       </div>
//     )
//     const [checkbox, radio, number] = getAllByTestId('elem')

//     userEvent.tab()
//     expect(checkbox).toHaveFocus()
//     userEvent.tab()
//     expect(radio).toHaveFocus()
//     userEvent.tab()
//     expect(number).toHaveFocus()
//   })
// })
