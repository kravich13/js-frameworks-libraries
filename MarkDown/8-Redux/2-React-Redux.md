# React-Redux

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
