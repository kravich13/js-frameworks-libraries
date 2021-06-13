- [jest](#jest)
  - [Основы](#основы)
    - [*Установка и запуск*](#установка-и-запуск)
    - [*Входные параметры*](#входные-параметры)
    - [*Общие принципы тестов и конвенция*](#общие-принципы-тестов-и-конвенция)
    - [*Работа с входящими данными*](#работа-с-входящими-данными)
  - [Основные методы теста](#основные-методы-теста)
    - [*Number*](#number)
    - [*String*](#string)
    - [*Array*](#array)
    - [*Object*](#object)
    - [*Null, falsy*](#null-falsy)
    - [*Not ===*](#not-)
    - [*Общий вид*](#общий-вид)
  - [Async](#async)
    - [*Done*](#done)


# jest

Применяется для тестирования приложений. Чем больше приложение - тем выше шанс получить где-то ошибку. Jest позволяет вычислять ошибки и тем самым в продакшн идёт "чистый" код. 

Файл тестирования обозначается как `kravich.jest.js`. 
***

## Основы

### *Установка и запуск*

Устанавливаем как зависимость `devDependencies`: 

```bash
npm init
npm i -D jest @types/jest
```

В `package.json` прописываем: 

```json
"scripts": {
    "test": "jest"
  },
```

И для автокомплита встроенных методов создаём `jsconfig.json` и прописываем:

```json
{ "typeAcquisition": { "include": ["jest"] } }
```


Запускаем по команде: 

```bash
npm test
```

### *Входные параметры*

Тест происходит следующим образом:

```js
const sum = (a, b) => a + b
const nativeNull = () => null

module.exports = { sum, nativeNull }
```

От этих функций ожидается какое-то конкретно значение и нужно проверить, что прилетит именно оно. 

### *Общие принципы тестов и конвенция*

Всё тестирование происходит с помощью функции `test`, которая принимает два параметра:

1. Название операции
2. CallBack функцию для всех тестов


Один `test` - один конкретный список операций для конкретной функции.

Поскольку тестов для одной функции может быть много, то лучше всего разделять эти тесты, чтобы было видно, где списки тестов для одной функции, а где - для другой. 

Для этого придуман метод `describe`, который принимает такие же два параметра и в `CB` помещают тесты для одной функции:

```js
describe('Sum function', () => {
  test('return bla bla 1', () => {})
  test('return bla bla 2' ,() =>{})
})
```

Некоторые тесты можно пропускать с помощью `.skip`:

```js
describe.skip('Sum function', () => {})
test.skip('return bla bla 1', () => {})
```

А также методом `only` можно запускать только один конкретный (когда много тестов): 

```js
describe.only('makePoniesPink', () => {})
test.only('make each pony pink', () => {})
```

### *Работа с входящими данными*

Можно просто создать глобальную переменную, но она каждый раз будет переписываться и при каждом новом тесте с этой модифицированной переменной тесты будут проходить не так, как должны.

Следующие методы решают проблемы и улучшают связь:

```js
describe('makePoniesPink', () => {
  let arr 

  beforeAll(() => {}) // Запустить до всех тестов

  afterAll(() => {}) // Запустить после всех тестов

  // Запустить до каждого нового теста
  beforeEach(() => {  arr = ['Vlad', 'Max', 'Katya'] }) 
  
  afterEach(() => {}) // Запустить после каждого теста

  test('make everyone Kravich', () => {
    const actual = fn(arr)) // length 3
    expect(actual).toEqual(['Kravich Vlad', 'Kravich Max', 'Kravich Katya'])
  })
})
```
***

## Основные методы теста

Само тестирование происходит с помощью функции `expect` (ожидать).

Принимает 1 параметр - вызов функции и для `expect` используются разные методы.


### *Number*

```js
// Number
expect(sum(13, 20)).toBe(33) // может быть значением 33
expect(sum(13, 20)).toEqual(33) // может быть числом 33
expect(sum(3, 3)).toBeGreaterThan(5) // больше 5
expect(sum(2, 3)).toBeGreaterThanOrEqual(5) // больше или равняется 5
expect(sum(2, 2)).toBeLessThan(6) // меньше 5
expect(sum(2, 3)).toBeLessThanOrEqual(5) // меньше или равняется 5
expect(sum(0.1, 0.2)).toBe(0.3) // Received: 0.30000000000000004
expect(sum(0.1, 0.2)).toBeCloseTo(0.3) // 0.3
expect(NaN).toEqual(expect.any(Number))	// Number type
```

### *String*

```js
expect('kravich').not.toMatch(/I/)
expect(['pizza', 'coffee']).toEqual([expect.stringContaining('zz'), expect.stringMatching(/ff/)])
expect('string').toEqual(expect.any(String))	// String тип
```

### *Array*

```js
 expect(['vlad', 'max', 'kravich']).toContain('max') 
 expect(['vlad', 'max', 'kravich']).toHaveLength(3) 
 expect([{ a: 1 }, { a: 2 }]).toContainEqual({ a: 1 }) 
 expect(['vlad', 'max', 'kravich']).toEqual(expect.arrayContaining(['vlad', 'max'])) 
```

### *Object*

```js
expect({ a: 1 }).toHaveProperty('a') // exsist
  expect({ a: 1 }).toHaveProperty('a', 1) // key and value
  expect({ a: { b: 1 } }).toHaveProperty('a.b') // there is b in a
  expect({ a: 1, b: 2 }).toMatchObject({ a: 1 }) // exsist
  expect({ a: 1, b: 2 }).toMatchObject({
    a: expect.any(Number),
    b: expect.any(Number),
  }) // check of types values
  expect([{ a: 1 }, { b: 2 }]).toEqual([
    expect.objectContaining({ a: expect.any(Number) }),
    expect.anything(), // что угодно
])
```

### *Null, falsy*

```js
expect(nativeNull()).toBe(null) // null
expect(nativeNull()).toBeNull() // null
expect(nativeNull()).toBeFalsy() // !value
expect(nativeNull()).toBeDefined() // определенное значение
expect(true).toEqual(expect.any(Boolean))	// Boolean тип
```

### *Not ===*

```js
expect(nativeNull()).not.toBeTruthy() // тоже самое, что и falsy
expect(nativeNull()).not.toBeUndefined() // не undefined
```

### *Общий вид*

```js
const { sum, nativeNull } = require('./intro')

describe('Sum function', () => {
  test('should return sum of to values', () => {
    expect(sum(13, 20)).toBe(33) // может быть значением 33
  })

  test('should return value other', () => {
    expect(sum(2, 3)).toBeLessThanOrEqual(5) // меньше или равняется 5
  })

  test('should sum 2 float values correctly', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3) // 0.3
  })
})

describe('NativeNull function', () => {
  test('return false null', () => {
    expect(nativeNull()).toBeNull() // null
    expect(nativeNull()).toBeFalsy() // !value
  })
})
```
***

## Async

С тестами асинхронного кода всё просто.

Есть асинхронный код: 

```js
function resAsync(data) {
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      data ? resolve(data) : reject(new Error('error'))
    }, 500)
  })

  return result
}

module.exports = { resAsync }
```

И проверяем его на наличие ошибок: 

```js
const { resAsync } = require('./async')

describe('Promise', () => {
  test('should return value async', async () => {
    const result = await resAsync('some data')
    expect(result).toBe('some data') // true
  })

  test('should return value with promise', async () => {
    return resAsync('kravich').then((data) => {
      expect(data).toBe('kravich') // true
    })
  })

  test('should catch error with promise', async () => {
    try {
      await resAsync()
    } catch (err) {
      expect(err.message).toBe('error') // true
    }
  })
})
```

### *Done*

Работает как `resolve` у промисов:

```js
test('return kravich', (done) => {
  function just_fn(data) {
    try {
      expect(data).toBe('kravich')
      done()
    } catch (err) {
      done(err)
    }
  }
  just_fn('kravich')
})
```