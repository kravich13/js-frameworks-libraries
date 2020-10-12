# POST-запросы и отправка форм

При отправке сложных данных (типа форма регистрации) используются формы.

Для получения данных форм из запроса нужно определить пакет `body-parser` в проекте: 

```bash
npm i body-parser
```

Также нужно определить `html` файл: 

```html
<!-- register.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
</head>
<body>

    <h1>Введите данные</h1>
    <form action="/register" method="post">
        <label>Имя</label><br>
        <input type="text" name="userName" /><br><br>
        <label>Возраст</label><br>
        <input type="number" name="userAge" /><br><br>
        <input type="submit" value="Отправить" />
    </form>

</body>
</html>
```

Здесь определены два поля для ввода имени и возраста. После нажатия на кнопку данные будут уходить по адресу `/register`.


В `app.js` определим следующий код: 

```javascript
const express = require("express")
const bodyParser = require("body-parser")

const app = express()


// Для получения отправленных данных создаём парсер
const urlencodedParser = bodyParser.urlencoded( {extended: false} )


// Импортируем файл register.html по пути /register
app.get("/register", urlencodedParser , function (request, response) {
    response.sendFile(__dirname + "/register.html")
})


app.post("/register", urlencodedParser, function (request, response) {

    if (!request.body) return response.sendStatus(400)
    console.log(request.body)

    response.send(`${request.body.userName} - ${request.body.userAge}`)
})

app.get("/", function (request, response) {
    response.send("Главная страница")
})

app.listen(3000)
```

Поскольку данные отправляются с помощью формы, то для создания парсера применяется функция `urlencoded()`, в которую в качестве параметра передаётся объект, устанавливающий параметра парсинга:

* `extented: false` - указывает, что объект - результат парсинга будет предоставлять набор `ключ/значение`, а каждое значение может быть представлено в виде строки или массива.

Т.к. данные отправляются с помощью метода `POST`, для обработки определяем функцию `app.post(/register, ...)`:

* Первый параметр - адрес, на который идёт отправка (`/register`).
* Второй параметр - выше созданный парсер.
* Третий параметр - обработчик.
* 

Для получения отправленных данных используем выражения типа `request.body.userName`, где `request.body` инкапсулирует данные формы, а `userName` - ключ данных, который соответствует значению атрибута name поля ввода на `html`-странице:

```html
<input type="text" name="userName" />
```

При обращении к адресу `localhost:3000/register`: высветится содержимое файла `register.html` с двумя выше описанными полями. 

* ### Terminal

```bash
# Ввод имени и возраста
[Object: null prototype] { userName: 'Владислав', userAge: '23' }

# Ввод только возраста
[Object: null prototype] { userName: '', userAge: '23' }

# Ввод только имени
[Object: null prototype] { userName: 'Влад', userAge: '' }

# Отправка пустых полей
[Object: null prototype] { userName: '', userAge: '' }
```

