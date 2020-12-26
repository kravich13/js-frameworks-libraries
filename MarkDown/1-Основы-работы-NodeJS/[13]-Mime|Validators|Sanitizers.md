# Mime Type, Validator | Sanitization, Express-Validator

## Mime Type

### ***Установка и подлючение:*** 

```bash
npm i mime
```
и 

```javascript
const mime = require("mime")
```

### ***Методы:***

* ### `mime.getType(pathOrExtension)`
    Определяет расширение файла (**app.js** например) и возвращает его **тип**:

    ```javascript
    console.log(mime.getType("js"))     // application/javascript
    console.log(mime.getType("json"))   // application/json

    console.log(mime.getType("txt"))                // text/plain
    console.log(mime.getType("dir/kravich.txt"))    // text/plain
    console.log(mime.getType("dir/kravich.txt"))    // text/plain
    console.log(mime.getType(".kravich.txt"))       // text/plain
    console.log(mime.getType(".txt"))               // text/plain
    ```

* ### `mime.getExtension(type)`
    Определяет тип файла и возвращает его **расширение**: 

    ```javascript
    console.log(mime.getExtension("text/plain"))    // txt
    console.log(mime.getExtension("application/json")) // json
    console.log(mime.getExtension("text/html; charset=utf8")) // html
    ```

* ### `mime.define(typeMap[, force = false])`
    Сопоставляет типы. По дефолту возвращает ошибку, если попытаться сопоставить тип с расширением, которое уже присвоено другому типу:

    ```javascript
    mime.define({"text/x-abc": ["abc", "abcd", "kravich"]})

    console.log(mime.getType("abc"))        // text/x-abc
    console.log(mime.getType("abcd"))	    // text/x-abc
    console.log(mime.getType("kravich"))    // text/x-abc
    console.log(mime.getType("test"))	    // null
    
    console.log(mime.getExtension("text/x-abc"))    // abc	
    console.log(mime.getExtension("text/x-abcd"))    // abc
    console.log(mime.getExtension("text/x-abcd"))   // null
    ```
***

## Validation

Это библиотека, которая проверяет и очищает только **строки**, всё остальное - **ошибка**. 

### ***Установка и подключение:***

```bash
npm i validator
```
```js
const validator = require("validator")
```

### ***Клиент:***
Валидатор также можно использовать и на стороне клиента, но всё равно нужно проверять на стороне сервера:

```js
<script src="validator.min.js"></script>
<script>
	validator.isEmail("kravich13@gmail.com") // true
</script>
```

### ***Методы библиотеки:***

```javascript
// Проверка на почту:
const numb = 13
console.log(validator.isEmail("kravich13@gmail.com")) // true
console.log(validator.isEmail(`kravich${numb}@gmail.com`)) // true
console.log(validator.isEmail(`${numb}`)) // false


// Проверка на пустую строку:
console.log(validator.isEmpty(" ")) // false
console.log(validator.isEmpty(""))  // true 


// Проверка на длинну строки в диапазоне:
console.log(validator.isLength("", { min: 2, max: 13} )) // false
console.log(validator.isLength("K", { min: 2, max: 13} )) // false
console.log(validator.isLength("Kravich", { min: 1, max: 13} )) // true


// Проверка на число в диапазоне:
console.log(validator.isInt("13", { min: 13, max: 20 }))	// true
console.log(validator.isInt("13", { min: 10, max: 2 }))     // false


// Проверка на совпадения из массива:
// true - (ищет только по точному совпадению), есть такой элемент.
console.log(validator.isIn("kra", ["kravich", "papa", "kukareku", "kra"]))	

// Проверка на регулярное выражение:
// console.log(validator.matches("Vlad Kravich", /\w+/)) // true


// Проверка на точное совпадение строки:
console.log(validator.equals("kravich", "kravich"))	// true


// Проверка на номер телефона по индексу: 
console.log(validator.isMobilePhone("0954321000", "uk-UA"))		// true
console.log(validator.isMobilePhone("380954321000", "uk-UA"))	// true

// Проверка на номер телефона в строгом режиме: 
console.log(
	validator.isMobilePhone("380954321000", "uk-UA", { strictMode: true })
) // false
console.log(
	validator.isMobilePhone("+380954321000", "uk-UA", { strictMode: true })
) // true


// Проверка на коррекнтную дату:
console.log(validator.isDate('1997-13-09'))	// false
console.log(validator.isDate('1997-02-09'))	// true


// Проверка на хеш и алгоритм:
// true
console.log(validator.isHash('2ac2b01f3f15671f4be4f1816c639d45', 'md5'))
// false
console.log(validator.isHash('2ac2b01f3f15671f4be4f1816c639d45', 'sha1'))


// Проверка на булевский тип:
console.log(validator.isBoolean("true"))        // true
console.log(validator.isBoolean("undefined"))   // false


// Проверка на порт (от 1000 до 65535):
console.log(validator.isPort("65536"))	// false
console.log(validator.isPort("1000"))	// true


// Проверка на макАдрес:
console.log(validator.isMACAddress('01-02-03-04-05-ab'))	// true


// Проверка на регистр:
console.log(validator.isLowercase('kravich'))	// true
console.log(validator.isUppercase('KRAVICH'))	// true

// Проверка на MimeType:
console.log(validator.isMimeType('text/plain'))	// true
```

### ***Sanitizers:***

```javascript
// Фильтрует данные из переданной строки:
// Vlad Kravich
console.log(validator.blacklist("[Vlad, Kravich!]", "\\[\\],!"))


// Ищет все символы из второго параметра:
// aavich
console.log(validator.whitelist('Vlad, Kravich!', 'avich'))	


// Заменяет переданные HTML теги на спец. символы:
// &lt;p&gt;Test code&lt;&#x2F;p&gt;
console.log(validator.escape('<p>Test code</p>'))


// Ищет текст и удаляет все пробелы в начале и в конце:
// "Test kravich"
console.log(validator.trim(' Test kravich '))

// Возвращает текст после переданных символов во втором параметре:
// "t kravich "
console.log(validator.ltrim(' Test kravich ', ' Tes'))


// Возвращает корректный email:
// kravich13@gmail.com
console.log(validator.normalizeEmail('kra.VICH13@gmail.com'))


// Возвращает корректную дату, если нет - null:
console.log(validator.toDate("2020-12-23")) // 2020-12-23T00:00:00.000Z
console.log(validator.toDate("2020-13-23")) // null


// Возвращает целое число:
console.log(validator.toInt("13")) // 13
console.log(validator.toInt("13.9")) // 13


// Возвращает число с плавающей запятой:
console.log(validator.toFloat("13.9")) // 13.9
console.log(validator.toFloat("13")) // 13
```
***

## Express-Validator

Это экспрессовски модуль, который проверяет входящие данные валидатором на уровне **middleware** (не доходя до `req`, `res`).

### ***Установка:***

```bash
npm i express-validator
```

### ***Работа с методами:***
Методы промежуточного слоя (**middleware**):

* ### `[ check(key, method) ]` 
    Все внутренние проверки (валидаторы) должны быть успешны, чтобы эта функция вернула положительный результат. При отсутствии успешности - `key` и `value` будут отсутствовать.

    Возвращает цепочку проверки для **одного** или **нескольких** полей, которые могут находиться в **любом** из объекта запроса. Также для каждого такого запроса есть свой собственный метод:
    
    * `req.body`    - `body(key, method)`
    * `req.cookies` - `cookie(key, method)`
    * `req.headers` - `header(key, method)`
    * `req.params`  - `param(key, method)`
    * `req.query`   - `query(key, method)`

    Метод `check` **изменяет** `req`, заполняя его результатом проверки, который может быть **получен** с помощью: 

    * `matchedData(req)`
    * `validationResult(req)`

    Делать **проверки** можно как для **одного** поля, так и для **нескольких**: 

    * `check(key1).method()`
    * `check[(key1, key2)].method()` - **массив с несколькими полями**.

    Пример с получением одного поля

    ```javascript
    const express = require("express")
    const app = express()
    const jsonParser = express.json()
    const { matchedData, check } = require('express-validator');
    const path = require("path");
    const { default: validator } = require("validator");
    const PORT = process.env.PORT || 3000

    app.post("/", jsonParser,

    // проверяем входящий key "userEmail"
        [check('userEmail') 
            .isEmail(), // цепляем валидатор на почту
        ],
        function (req, res) {

            const matches = matchedData(req)

            console.log(matches)
            // { userEmail: 'user@gmail.com' } - успех
            // {} - неуспех 

            res.end()
        })

    app.use(express.static(path.join(__dirname, 'public')))

    app.listen(PORT)
    ```
    
* ### `oneOf (validationChains[, message])`
    Хотя бы одна проверка (`check` и т.д.) должна быть успешной, чтобы функция вернула положительный результат.

    Параметры: 
    * массив цепочек валидации или он же для группировки.
    * необязательное сообщение для использования в случае сбоя всех цепочек

    Пример: 

    ```javascript
    const express = require("express")
    const app = express()
    const jsonParser = express.json()
    const { oneOf, matchedData, check, validationResult } = require('express-validator');
    const path = require("path");
    const { default: validator } = require("validator");
    const PORT = process.env.PORT || 3000

    app.post("/", jsonParser,

        oneOf([
            check('userEmail').isEmail(),
            check('userText').isLength({min: 2})
        ]),
        function (req, res) {

            console.log(req.body)
            // { userEmail: '1dsad', userText: '1' }

            res.end()
            
            try {
                // если хотя бы одно поле будет верным - undefined
                const errors = validationResult(req)
                errors.throw()

                // если же все поля неверны - 
                // errors: [
                //     { msg: 'Invalid value(s)', param: '_error', nestedErrors: [Array] }
                //   ]

                res.end()
            } catch (err) {
                err.errors.forEach((item) => console.log(item.nestedErrors))
                res.status(400).end()
            }
        })

    app.use(express.static(path.join(__dirname, 'public')))
    app.listen(PORT)
    ```

### ***Цепочки валидаторов:***

* ### `bail()` и `withMessage(str)`
    `bail()` останавливает выполнение проверки, если какая-то из предыдущих не удалась, а `withMessage()` выводит сообщение об ошибке, если такая есть.

    При необходимости можно может использоваться несколько раз в цепочке проверки:

    ```js
    app.post("/", jsonParser,

    [
        check('userEmail')
        .equals("kravich@gmail.com")
        .bail()
        .withMessage("Нет совпадения на точный email")
        // если есть ошибка - в следующий экземпляр валидатора не зайдет
        .isLength({min: 10}),

        check('userText').isLength({min: 2})

    ],
    function (req, res) {
        // req.body.userEmail: kravich13@gmail.com
        try {
            const errors = (req.result = validationResult(req))
            console.log(errors)
            errors.throw() 
            // в случае ошибки выдаст следующее:

            // errors: [
            //    {
            //     value: 'kravich13@gmail.com',
            //     msg: 'Нет совпадения на точный email',
            //     param: 'userEmail',
            //     location: 'body'
            //     }
            // ]

        } catch (err) {
            err.errors.forEach((item) => console.log(item.nestedErrors))
            res.status(400).end()
        }
    })
    ```

* ### `custom(validator)`
    `validator(value, { req, location, path })` - настраивая функция валидатора. Получает значение поля, а также экспресс-запрос, месторасположение и путь к полю. **Возвращает** `true` или `false`.

    Используется там, где нужно придумать какое-то своё особенное условие.

    Пользовательский валидатор может генерировать исключения JS (`throw new Error()`) и вернуть `false`.

    ```js
     [
        check('userEmail')
            .isLength({min: 10})
            .custom((value) => value === "kravich@gmail.com"),
            // вернёт true, если равно
            
        check('userText').isLength({min: 2})
            .custom((value) => value != req.body.userEmail)


    ],
    function (req, res) {
        try {
            console.log(req.body)
            const errors = (req.result = validationResult(req))
            console.log(errors)

            // выстрелит ошибка, если custom вернёт false
            errors.throw() 
            
            res.end()
        } catch (err) {
            err.errors.forEach((item) => console.log(item.nestedErrors))
            res.status(400).end()
        }
    })
    ```

* ### `.customSanitizer(sanitizer)`
    Добавляет настраиваемый `sanitizer` в цепочку проверок. 

    Он должен синхронно возвращать новое значение, которое будет принято и изменено со старого на новое.

    `sanitizer(value, { req, location, path })` - настраиваемый `sanitizer`:

    ```javascript
    [
        check('userEmail')
            .isLength({min: 10}),
            
        check('userText').isLength({min: 2})
            .customSanitizer((value, {req}) => Number(value))
            // приведет передаваемую строку в число (или NaN)
    ],
    ```



* ### `.exists(options)` 
    Добавляет валидатор для проверки текущих полей в запросе. Если значение не `undefined` - вернёт `true`.

    Можно настроить это поведение:

    * `checkNull` - если `true`, полей с `null` не будет.
    * `checkFalsy` - если `true`, полей `""`, `0`, `false`, `null` также не существует.

    ```js
    [
        check('userEmail')
            .isLength({min: 5}),
            
        check('userText')
            .exists({checkFalsy: true}), 
            // поля с "". 0, false и null будут критовать в throw
    ],

    //errors: [
    //    {
    //    value: '',
    //    msg: 'Invalid value',
    //    param: 'userText',
    //    location: 'body'
    //    }
    // ]
    ```

* ### `.if (condition)`
    Добавляет условие для принятия решения, следует ли продолжать проверку в поле или нет.

    Условие может быть цепочкой проверки (`check` и т.д.).

    ```javascript
    body('oldPassword')
    // Если указан новый пароль
    .if((value, { req }) => req.body.newPassword)
    
    .if(body('newPassword').exists())
    // То старый тоже должен быть
    .not().empty()
    // И они не должны быть равны
    .custom((value, { req }) => value !== req.body.newPassword)
    ```

* ### `.isArray ([options])` 
    Принимает `min` и `max` **length** массива.

* ### `.isString()`
    Проверяет, является ли значение строкой.

* ### `.not()`
    Отменяет результат следующего валидатора:

    ```javascript
    check('weekday')
        .not().isIn(['sunday', 'saturday'])
    ```
    
* ### `.notEmpty()`
    Не пусто, если длина **1+**:

    ```js
    check('userText')
            .notEmpty()
    ```

### ***Методы обработчиков результатов:***

* ### `matchedData (req [, options])`
    Собирает `key` и `value`, которые прошли **все** результаты проверок.

    Параметры: 

    * `includeOptionals` - если `true`, возвращаемое значение включает необязательные данные. По дефолту `false`.

    * `onlyValidData` - если `false`, возвращаемое значение включает данные из полей, которые не прошли проверку. По дефолту `true`.
    * `locations` - массив местоположений для извлечения данных. Допустимые значения включают `body`, `cookies`, `headers`, `params` и  `query`. По дефолту `undefined`, что означает все местоположения.

    ```javascript
    // { userEmail: 'corlack1997@gmail.com', userText: '' }
    [
        check('userEmail')
            .isEmail(),
            
        check('userText') 
            .isLength({min: 1})
    ],
    
    function (req, res) {


        const bodyData = matchedData(req, { locations: ['body'] })
        const allData = matchedData(req, {onlyValidData: false})

        console.log(bodyData) // ищет только по body
        console.log(allData) // с учётом всех ошибок

        // { userEmail: 'corlack1997@gmail.com' }
        // { userEmail: 'corlack1997@gmail.com', userText: '' }

        res.end()
    })
    ```

* ### `validatorResult(req)`
    Извлекает ошибки из проверок запроса и делает их доступными в `result` объекте.

    Можно использовать `.throw()` и исследовать ошибки вручную:

    ```javascript
    const result = validationResult(req)

    // если не пустая строка
    if  (!result.isEmpty()) { 
        // обработка ошибок
    }
    ```
    