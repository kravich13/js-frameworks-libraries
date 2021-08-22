- [Typescript](#typescript)
  - [Основы](#основы)
    - [***Установка и использование:***](#установка-и-использование)
    - [***Указание типов данных:***](#указание-типов-данных)
    - [***Основное:***](#основное)
    - [***Функции:***](#функции)
    - [***Перегрузка функций***:](#перегрузка-функций)
    - [***Работа со стрелочными функциями***:](#работа-со-стрелочными-функциями)
    - [***Интерфейсы, объекты и классы:***](#интерфейсы-объекты-и-классы)
    - [***Enum:***](#enum)
    - [***Динамические ключи:***](#динамические-ключи)
  - [Компиляция](#компиляция)
  - [Файл конфигурации](#файл-конфигурации)
    - [***Структура файла:***](#структура-файла)

# Typescript

## Основы

`TypeScript` используется как надстройка над `Javascript`. Он позволяет не потерять где-то переменную с её типом, а указать в каком виде всё должно прийти и в каком должно сработать (как в `GraphQL`). 

Т.е. код пишем на `TS`, компилируем `JS`, `JS` не трогаем и вставляем его в проект. 

### ***Установка и использование:***

Для работы с `TypeScript` его нужно установить глобально на систему (используется вместе с `NodeJS`):

```bash
sudo npm install -g typescript
```

После установки нужно создать директорию, в которой будет использоваться код. Именно эта директория с `TypeScript` требуется для преобразования в правильный `Javascript`.

Для преобразования требуется выполнить команду в этой папке в терминале (как с `NodeJS`):  

```bash
tst Test1.ts
```

### ***Указание типов данных:***

* `Boolean`
* `Number`
* `String`
* `Array`
* `Tuple`   - миксины
* `Enum`    - перечисления
* `Any`     - произвольный тип
* `Null` | `undefined`
* `Void`    - отсутствие конкретного значения, используется для `return` функций
* `Never`   - отсутствие значение и используется для `return` функций, которые генерируют или возвращают ошибку.

### ***Основное:***
```ts
/////////Переменные 
let num: number = 13
let str: string = "Kravich"
let bool: boolean = true



/////// Any 
let all: any = "любой тип"
all = 13 // работает



/////////type - пишутся с большой буквы /
type Login = string
const login: Login = "kravich" // kravich

type StrNumb = string | number
const testNumb: StrNumb = "qq all"  // +
const testStr: StrNumb = 5          // +



/////// Массивы 
const arrNumb: number[] = [13, 14]
const arrStr: string[] = ["Vlad", "Kravich"]
const arrBool: boolean[] = [true, false]
const anyArr: any[] = [{ name: "Vlad", age: 23 }, { name: "Max", age: 28 }]



/////// Миксины - для каждого элемента массива свой собственный тип /
const arrNumStr: [number, string] = [13, "Aventador"]
const arrNumbStr: [number, number, string] = [13, 15, "Vlad"] 
```
***

### ***Функции:***

```ts
/////// Функции: дополнение к type
// Знак вопроса в конце параметра - неопределенное кол-во параметров
fnTest("Vlad")
fnTest("Vlad", 23)

function fnTest (name: string, age?: number): void {

    if (age) console.log(`name: ${name}, age: ${age}`)
    else console.log(`name: ${name}`)
}

// К type можно установить свои значения:
type MyStr = "vlad" | "max" | "kravich"

testStr("max")
testStr("maximus") // // ошибка, нет такого значения

function testStr (status: MyStr): void {
    console.log(`Привет ${status}`)
}


// Можно принять как строку и число
function getLength (obj: string | string[]) {
    return obj.length // вернёт длинну строки или массива
}
// или строка или массив
console.log(getLength(["qq", "test"])) 
```

### ***Перегрузка функций***:

Позволяет для одной функции определить разные условия входа параметров и выхода результата (`return`), делается это так:

```ts
add(13, 4)       // 17
add("13", "4")    // "134"

function add (x: string, y: string): string  // вернёт строку
function add (x: number, y: number): number  // вернёт число
function add (x: any, y: any): any {    
    return x + y
}
```

### ***Работа со стрелочными функциями***:

В переменную со стрелочкой функцией фактически должна быть передана обычная функция и после этого можно сделать вызов со стрелочкой функци:

```ts
function sum (x: number, y: number): number {
    return x + y
}
function subtract (a: number, b: number): number {
    return a - b
}
let op: (x:number, y:number) => number
 
op = sum
console.log(op(2, 4))  // 6
 
op = subtract
console.log(op(6, 4))  // 2
```

Для стрелочных функций с телом можно использовать следующее:

```ts
let sum = (x: number, y: number) => x + y
console.log(sum(13, 4))


// Можно опустить тип параметров:
let sum = (x, y) => x + y
console.log(sum(13, 4)) 
```

***

### ***Интерфейсы, объекты и классы:***

```ts
/////// Интерфейс - подобие структуры схем в БД и GraphQL
interface User {
    name: string
    age: number
    crypto: string[]
}

user({ name: "Vlad", age: 23, crypto: ["eos", "eth", "ltc"] })

function user (us: User) {
    console.log(`${us.name}, ${us.age}, ${us.crypto}`)
}


// То же самое работает с объектами
interface UserInterface {
    name: string
    id: number
}

const user: UserInterface = {
    name: 'vlad',
    id: 13
}



/////// Классы
class Kravich {
    name: string
    email: string
    age: number

    constructor (name: string, email: string, age: number) {
        this.name = name
        this.email = email
        this.age = age

        console.log(`Создан Кравич ${this.name}`)
    }
}
const vlad = new Kravich("Vlad", "kravich13@gmail.con", 23)
console.log(vlad.age) // 23
```

### ***Enum:***

Перечисления - это наборы именованных констант. Может быть **строковым** или **числовым**:

```ts
// На индексе, который начинается с нуля как у массивов:
enum Crypto {
    BTC,
    ETH,
    EOS
}

const index = Crypto.ETH 
console.log(index) // 1


// По ключу:
enum CryptoCount {
    BTC = "1 BTC === $47k",
    ETH = "1 ETH === $1450",
    EOS = "1 EOS === $3,65"
}

const price = CryptoCount.EOS 
console.log(price) // 1 EOS === $3,65

```

### ***Динамические ключи:***

Допустим, что нужно описать кучу свойств css объекта React:

```ts
interface cssStyles = {
    border: string
    borderRadius: string
    display: string
}

const styles: cssStyles = {
    border: "1px solid black",
    borderRadius: "5px",
    display: "flex"
}
```

Так делать абсолютно не удобно и вместо этого можно примедить динамические ключи:

```ts
interface cssStyles = {
    [key: string]: string
}

const styles: cssStyles = {
    border: "1px solid black",
    borderRadius: "5px",
    display: "flex"
}
```

***

## Компиляция

При компиляции файлов в терминале можно указать функциональные настройки.

* ### ***Автоматическая перекомпеляция:***

    `--watch` - втоматически производит комплияция при малейшем изменения. Работает как `nodemon`:

    ```bash
    tsc -w Test1.ts
    ```

* ### ***Версия ECMAScript:***
    
    `-target` - задаёт версию `JS` для комплияции, которая по дефолту установлена как `ES5`. Установить можно следующие версии: `ES5`, `ES6`, `ES2015`, `ES2016`, `ES2020` или `ESNext` и другие: 

    ```bash
    tsc Test1.ts -t ES6
    ```

* ### ***Удаление комментариев:***

    По дефолту все комментарии из `TS` при компиляции переходят в `JS`, их можно удалить:

    ```bash
    tsc Test1.ts --removeComments
    ```

* ### ***Установка каталога:***

    Можно задать папку для хранения скомпилированных файлов `JS`:

    ```bash
    tsc --ourDir путь/js Test1.ts
    ```

* ### ***Объединение файлов:***

    Если есть несколько `TS` файлов, то можно из них сделать один скомпилированный `JS` файл:

    ```bash
    # Сам JS файл и после него остальные TS файлы
    tsc --outFile script.js Test1.ts Test2.ts
    ```

* ### ***Несколько параметров:***

    ```bash
    tsc -t ES2020 --removeComments Test1.ts
    ```

* ### ***Вызов справки:***

    Просмотр всех доступных команд: 

    ```bash
    tsc -h
    ```
***

## Файл конфигурации 

С помощью `tsconfig.json` можно настроить компиляцию `TS`. Этот файл выполняет следующие задачи:

* устанавливает корневой каталог проекта `TS`;
* выполняет настройку параметров компиляции;
* устанавливает файлы проекта.

Если компилятору в терминале **передаются** названия файлов (`tsc Test1.ts`), то файл `tsconfig.json` **игнорируется**.

### ***Структура файла:***

Секция `compilerOptions` настривает параметры компиляции. В ней можно указать любые параметры и значения. Название `key` и `value` соответствует командам в терминале:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "removeComments": true
    }
}
```

В секции `files` в массиве можно установить набор **включаемых** в проект файлов `TS`. Если эта секция не установлена - в трансформацию в `JS` будут указаны все файлы `TS`:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "removeComments": true
    },
    "files": ["App.ts", "Test1.ts"]
}
```

В секции `exclude` в массиве можно установить набор **исключаемых** в проект файлов `TS`:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "removeComments": true
    },
    "exclude": ["App.ts", "Test1.ts"]
}
```

Если в `compilerOptions` будут одновременно заданы секции `files` и `exlude`, то **последняя** будет **игнорироваться**. 

Параметр `compileOnSave` при значении `true` указывает IDE сгенерировать все файлы `JS` при каждом сохрании файлов `TS`:

```json
{
    "compileOnSave": true,
    "compoleOptions": {
        "target": "ES2020"
    }
}
```