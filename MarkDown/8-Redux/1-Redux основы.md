# Redux

**Redux** помогает управлять глобальным состоянием, которое необходимо во многих частях приложения (**React** например). Обычный `React.Context` тут не поможет. 

Шаблоны и инструменты, предоставляемые **Redux**, позволяют легче понять, когда, где, почему и как обновляется состояние в приложении, и как логика приложения будет вести себя, когда эти изменения произойдут.

**Redux** полезен, когда:

* есть большое кол-во состояний приложения, которые необходимы во многих местах приложения
* состояние часто обновляется с течением времени
* логика обновления этого состояния может быть сложной
* над приложением могут работать многие люди (конвенция)


Т.е. получается, что **Redux** является глобальным контейнером, который хранит разные состояние и получить к ним доступ можно в приложении откуда угодно. 
*** 

## Основы

### ***CreateStore:***

Функция `CreateStore` - это и есть подключаемый модуль `npm i redux`, которая возвращает объект. 

```js
export function createStore(rootReducer, initialState) {

  let state = rootReducer(initialState, { type: '__INIT_' })

  // Массив слушателей событий 
  const subscribers = []

  return {
    // 1) Если что-то произошло
    // action === {type: 'INCREMENT'}
    dispatch(action) {

    
      // 1.1) rootReducer принимает два параметра:
      // предыдущий стейт и тип события
      state = rootReducer(state, action)

      // 1.2) уведомление всем слушателям, что стейт изменился
      subscribers.forEach((sub) => sub())
    },

    // 2) Нужно что-то поменять, CB выплнится, когда что-то произойдет
    subscribe(callback) {
      subscribers.push(callback)
    },

    // 3) Получаемый стейт 
    getState() {
      return state
    }
  }
}
```
***

## Actions

обычно все наименования `type: 'ДЕЙСТВИЕ'` обозначают в отдельных файлах в виде **констант** и используют их, чтобы не допускать ошибки:

```js
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
```


И эти константы теперь можно использовать в отдельном файле `actions`, в котором по сути, каждая экмпортирующая функция возвращает `{ type: DECREMENT }`. 
```js
import { INCREMENT, DECREMENT } from './types.js'

export function increment() {
  return {
    type: INCREMENT
  }
}

export function decrement() {
  return {
    type: DECREMENT
  }
}
```
***

## Reducer

Эта функция принимает первым параметром стейт и действие, а возвращает новый стейт. По сути, эта функция `rootReducer` и производит всю логику со стейтами и возвращает все изменения стейта. Это просто кейс с логикой вынесенный за пределы проекта и является контейнером логики.

```js
import { INCREMENT, DECREMENT } from './types.js'
export function rootReducer(state, action) {

  // Т.е. reducer пробегается по тайпу и если находит совпадение с константой (строкой), то он изменяет стейт и возвращает его
  if (action.type === INCREMENT) return state + 1
  else if (action.type === DECREMENT) return state - 1


  // Если Кейс не сработал, то возвращает первоначальный стейт
  return state
}
```


Теперь можно посмотреть, что это за объект `store` на выходе:

```js
const store = createStore(rootReducer, 0)
// { dispatch: f, subcribe: f, getState: f }

// store.getState() - вернёт первоначальный стейт 0
```

Это обычный объект с тремя функциями, которые описаны выше.

И можно произвести манипуляции со стейтом через эти функции. 


```js
import { createStore } from './createStore.js'
import { rootReducer } from './redux/rootReducer.js'
import { increment, decrement } from './redux/actions.js'

const $countSpan = document.getElementById('countState')
const $addBtn = document.getElementById('getAdd')
const $takeBtn = document.getElementById('getTake')
const $asyncBtn = document.getElementById('getAsync')
const $themeBtn = document.getElementById('getTheme')


// 1) Передаём reducer в redux с первоначальным стейтом
const store = createStore(rootReducer, 0)

$addBtn.addEventListener('click', () => {
    store.dispatch(increment())
  // 2) { type: 'INCREMENT' }
})

$takeBtn.addEventListener('click', () => {
    store.dispatch(decrement())
  // 2) { type: 'DECREMENT' }
})


// 3) Теперь, чтобы понять, что что-то изменилось - подписываемся на изменения
store.subscribe(() => {

  // Получаем послединй стейт:
  const state = store.getState()
  $countSpan.textContent = state
})

// Возвращаем первоначальный стейт
store.dispatch({ type: 'INIT_APPLICATION' })
```
***

### ***Несколько функций в одном reducer:***

Каждая функция в компоненте `Reducer` отвечает за работу с одним стейтом, так легче работать. 

Но `createStore` принимате лишь один `reducer` и для решения этой проблемы можно экмпортировать единый объект `rootReducer`: 

```js
// rootReducer.js
import {combineReducers} from 'redux'

import { INCREMENT, DECREMENT } from './types.js'

function counterReducer(state, action) {
  if (action.type === INCREMENT) return state + 1
  else if (action.type === DECREMENT) return state - 1

  return state
}

function themeReducer(state, action) {
  return state
}


export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer
})
```

***

## Async middleware

По здравой логике (не редакса) можно просто прописать такой код:

```js
$asyncBtn.addEventListener('click', () => {
    setTimeout( () => {
        store.dispatch(increment())
    }, 2000)
})
```

Проблема в том, что данные могут прилетать с серва и нужно как-то отследить момент, когда данные получены. Таймаут здесь бесполезен.    

Для решения этой проблемы сущесвует концепт **middleware**:

```js
import {createStore} from 'redux'
import thunk from 'redux-thunk'


const store = createStore(
    rootReducer,
    0,
    applyMiddleware(thunk)
)
```

И асинхронность добавляем именно в `actions`:

```js
// actions.js
export function asyncIncrement() {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(increment())
    }, 1000)
  }
}


// index.js
$asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})
```