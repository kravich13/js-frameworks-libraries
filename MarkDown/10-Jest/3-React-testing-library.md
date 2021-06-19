- [React-Testing-Library](#react-testing-library)
  - [Основы](#основы)
    - [Окружение](#окружение)
    - [Поисковые типы](#поисковые-типы)
  - [Поисковые варианты и утверждения](#поисковые-варианты-и-утверждения)
    - [queryBy](#queryby)
    - [findBy](#findby)
    - [Список утверждений](#список-утверждений)

# React-Testing-Library

Эта библиотека опирается не на саму отрисовку, а на текст внутри этой отрисовки используя регулярные выражения.

Библиотека установлена по дефолту в приложение React (TS). Никаких доп. установок не требуется. 
***

## Основы

Весь функционал работает вместе с `jest`.

### Окружение

Здесь поиск лишь по конкретному тексту в компоненте: 

```tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders to the text', () => {

    render(<App />) // за каким компонентом наблюдать
    screen.debug() // показывает саму структуру компонента

    // Ищем просто тексты в документе
    expect(screen.getByText(/hello/i)).toBeInTheDocument()
    expect(screen.getByText(/Какая-то инфа/i)).toBeInTheDocument()
  })
})
```

### Поисковые типы

Если нужно найти элемент - используем `getBy`: 

```js
// поиск по тексту
screen.getByText(/kravich/i) 

// жмём ctrl+space и получаем список ролей (роль элемента)
screen.getByRole("button") 

// ищет текст в теге label
screen.getByLabelText(/Ваше имя/i)

// ищет текст в placeholder интпута
screen.getByPlaceholderText("Введите сообщение...")

// ищет текст по атрибуту alt у тега img
screen.getByAltText("нет картинки")

// ищет значение value, применяется для проверки дефолтного значения
screen.getByDisplayValue("Default value")
```
***

## Поисковые варианты и утверждения

### queryBy

Если нужно показать, что элемента нет - используем `queryBy`.

Есть код, в котором меняем состояние и в зависимости от этого состояния может появляться разный текст: 

```tsx
const App: React.FC = () => {
  const [pState, setPState] = useState<boolean>(false)

  return (
    <div className="App">
      <p>{pState ? 'Max' : 'Vlad'} Kravich</p>
      <button onClick={(): void => setPState(true)}>Нажми</button>
    </div>
  )
}
```

Тестирования, что элемента действительно нет в разметке: 

```tsx
it('renders to search variants', () => {
  render(<App />)  

  // Такого текста ещё нет
  expect(screen.queryByText(/Max Kravich/i)).toBeNull() 
})
```

### findBy

Метод `findBy` используется для поиска асинхронных элементов, которых изначательно в разметке не было, но после асинхронного кода они появятся: 

Код с промисом, который вернёт значение и `useEffect`, который изменит стейт из промиса и покажет элемент после того, как стейт изменился:

```tsx
const getUser = (): Promise<string> => Promise.resolve('Max')

const App: React.FC = () => {
  const [user, setUser] = useState<string>('')

  useEffect((): void => {
    const loadUser = async (): Promise<void> => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (err) { return }
    }
    loadUser()
  }, [setUser])

  return (
    <div className="App">
      <div className="async-test">
        {user && <h2>Logged in as {user}</h2>}
      </div>
    </div>
  )
}
```

Тест: 

```tsx
it('renders async elem', async () => {
  render(<App />)

  // Проверка, что такой строки изначательн нет
  expect(screen.queryByText(/Logged in as/i)).toBeNull()

  // После асинхронного изменения стейта проверяем, что такая строка есть
  expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument()
  screen.debug()
})
```

### Список утверждений

Может быть: 

```bash
.toBeEmptyDOMElement
.toBeRequired
.toContainElement
.toBeEnabled
.toBeInTheDocument
.toBeValid
.toBeEmpty
.toBeInvalid
.toBeVisible
```

