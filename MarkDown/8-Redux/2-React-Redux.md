# React-Redux: основы, connect, typescript

## Основы

### Установка:

Связывание реакта и редакса: 

```bash
npm i redux react-redux
```

Для подключения редакса ко всему приложению, его нужно подключить туда, где подключается компонент `App`, т.е. в файле `index.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './redux/rootReducer'
import { App } from './App'
import './index.css'

// Подключаем редакс с переданным в него редьюсером
const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <!-- Оборачиваем компонент в контекст редакса и передаём объект store-->
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```
***

## Connect
Чтобы отправить данные в этот провайдер (контекст) - нужно обернуть функцию в компонент высшего порядка под названием `connect`, подключаемый из `react-redux`. 

`Connect` принимает в себя два параметра по классике: 

1. Объект `mapStateToProps`, который принимает параметром `state` и возвращает нужный стейт в виде объекта
2. Объект `mapDispatchToProps`, который возвращает функцию из `actions`, которая изменяет стейт

Для наглядности, если передаётся только **один** параматер из **двух** (можно два сразу) - нужно писать `null` для наглядности: 

```tsx
connect(mapStateToProps, null)(Posts)
```

### ***Запись данных в Store***

Для записи в `Store` (глобал. объект стейтов) передаём в функцию `connect` **второй** параметр `mapStateToProps` с тем методом, который нужен для изменения стейта.

В конкретном примере - метод `createPost`, в который нужно записать данные: 
```tsx
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../redux/actions'

interface IpostElem {
  title: string
}

const PostForm: React.FC = (props: any) => {
  const [postElem, setPostElem] = useState<IpostElem>({ title: '' })

  const submitHandler = (event: React.KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newPost = {
      title: postElem.title,
      id: Date.now().toString()
    }

    // Записываем данные в createPost, который изменит...
    // ... общий стейт провайдера через props
    props.createPost(newPost)
  }

  const changeInputHandrer = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    setPostElem((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value
      }
    }))
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="title">Заголовок поста</label>
      <input
        type="text"
        name="title"
        value={postElem.title}
        onChange={(event: any) => changeInputHandrer(event)}
      />
      <button>Добавить</button>
    </form>
  )
}

// Передаём функцию изменения как надстройку
const mapDispatchToProps = { createPost }
export default connect(null, mapDispatchToProps)(PostForm)
```

### ***Прослушка событий из Store:***

Чтобы подписаться на события `Store` - передаём в функции `connect` **первый** параметр `mapStateToProps`, в котором возвращаем те стейты, которые нужны в этом компоненте: 

```tsx
const Posts: React.FC<any> = ({ syncPosts }): any => {
  if (!syncPosts.length) return <h3>Нет постов</h3>
  return syncPosts.map((post: any) => <Post post={post} key={post.id} />)
}

const mapStateToProps = (state: any) => {
  // State - объект с теми стейтами, которые были указаны
  // Извлекаем стейт posts для прослушки
  return {
    syncPosts: state.posts.posts
  }
}

export default connect(mapStateToProps, null)(Posts)
```
***

## Typescript 

### ***Установка и подключение:***
Для использования встроенной фичи редакса, нужно установить спец пакет `TS`: 

```bash
npm i @types/react-redux
```

У Redux есть специальный метод, который позволяет **связывать** два передаваемых объекта `mapDispatchToProps` и `mapStateToProps` под названием `ConnectedProps`: 

```jsx
import { connect, ConnectedProps } from 'react-redux'
```

### ***Случай с обоими объектами:***
Описываем в `interfaces` следующие структуры: 

```ts
// ============= Общий стейт всего редьюсера =============
interface ImapDispatchToProps {
  [key: string]: Function
}
interface IMapStateToProps {
  auth: {
    authorized: string
    eventSingUpAuth: string
    navbar: boolean
    monthNumber: number
    clickedMonth: boolean
  }
  tasks: {
    tasks: ITaskList_blocksTask[]
    dateClickDay: Date
  }
}
```

Т.е. определяем один раз **общий** стейт и затем делаем следующее: 

```tsx
const mapDispatchToProps: ImapDispatchToProps = { createTask, changeTask }
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    blocksTask: state.tasks.tasks,
    dateClickDay: state.tasks.dateClickDay,
    authorized: state.auth.authorized
  }
}

// 1) *
const connector = connect(mapStateToProps, mapDispatchToProps)

// 2) *
type PropsFromRedux = ConnectedProps<typeof connector>


const TaskList: React.FC<PropsFromRedux> = ({
  blocksTask,
  authorized,
  dateClickDay,
  createTask,
  changeTask
}) => {...}
```

1. Метод `connect` просто делает то же самое, что и раньше: связывает два объекта.
2. Спец. методом `ConnectedProps` получается на выходе готовый общий интерфейсный объект

И в итоге все пропсы компонента имеют **конкретный** тип. 

Если сказать коротко, то за счёт того, что в объекты передали полностью описанные типы всего стейта редакса  - `ConnectedProps` уже **заранее** знает, какой тип будет иметь каждый пропс из объекта `Store`. 

### ***Случай с одним mapStateToProps:***

Суть та же самая, в объект передаём интерфейс и всё работает: 

```tsx
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    authorized: state.auth.authorized
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Calendar: React.FC<PropsFromRedux> = ({ authorized }) => {}
```

Обязательно нужно убрать `null` у второго параметра, иначе `ConnectedProps` будет всегда возвращать `null` и компонент перестанет работать!


### ***Случай с одним mapDispatchToProps:***

Здесь уже не подойдет интерфейс с `[key: string]: Function`, его придется описывать отдельно: 

```ts
interface IMonth_DispatchProps {
  change_monthNumber: Function
}
```

И если помимо изменения стейта редакса прилетают обычные пропсы, то можно просто в тип записать интерфейс `PropsFromRedux` и второй, описывающий пропсы с компонента выше:

```tsx
const mapDispatchToProps: IMonth_DispatchProps = { change_monthNumber }
const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & IClickMonth_passedProps

const Month: React.FC<Props> = ({
  monthNumber,
  clickedMonth,
  authorized,
  change_monthNumber
}) => {...}
```

