- [JSON и AJAX](#json-и-ajax)


# JSON и AJAX

`JSON` представляет один из самых популярных форматов хранения и передачи данных, `Express` имеет все возможности для работы с `JSON`.

В `html` файле определим следующий код: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
</head>
<body>
    
    <h1>Введите данные</h1>

    <form name="registerForm">
        <label>Имя</label></br>
        <input type="text" name="userName" /></br></br>
        <label>Возраст</label></br>
        <input type="number" name="userAge" /></br></br>
        <button type="submit" id="submit">Отправить</button>
    </form>

    <script>
 
        document.getElementById("submit").addEventListener("click", function (event) {

            event.preventDefault()

            // получаем данные формы
            let registerForm = document.forms["registerForm"]
            let userName = registerForm.elements["userName"].value
            let userAge = registerForm.elements["userAge"].value

            // сериализуем данные в json
            let user = JSON.stringify({userName: userName, userAge: userAge})


            let request = new XMLHttpRequest()


            // посылаем запрос на адрес "/user"
             request.open("POST", "/user", true)    
             request.setRequestHeader("Content-Type", "application/json")

             request.addEventListener("load", function () {

                // получаем и парсим ответ сервера
                 let receivedUser = JSON.parse(request.response)
                 console.log(receivedUser.userName, "-", receivedUser.userAge)   // смотрим ответ сервера
             })

             request.send(user)
         })

    </script>

</body>
</html>
```

Здесь определена таже форма с именем и возрастом. Но теперь с помощью обработчика перехватывается отправка этой формы. Мы получаем значение её полей и помещаем в объект `json`, который затем отправляется на сервер с помощью `ajax` на адрес `/user`.


В `app.js` определим код для получения отправленных данных:

```javascript
const express = require("express")
const app = express()

// Создание парсера для получения данных
const jsonParser = express.json()

app.post("/user", jsonParser, function (request, response) {

    // Введенные пользователем данные
    console.log(request.body)
    
    if (!request.body) return response.sendStatus(400)

    // Отправка пришедшего ответа обратно
    response.json(request.body)
})

app.get("/", function (request, response) {

    response.sendFile(__dirname + "/index.html")
})

app.listen(3000)
```

```bash
# Terminal

userName: 'Владислав', userAge: '23'
```
