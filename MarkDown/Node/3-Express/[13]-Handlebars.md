- [Представления и движок представлений Handlebars](#представления-и-движок-представлений-handlebars)
  - [Модель представления](#модель-представления)
  - [Динамические поля и функционал js в html](#динамические-поля-и-функционал-js-в-html)
  - [Изменение пути к представлениям](#изменение-пути-к-представлениям)

# Представления и движок представлений Handlebars

Как правило, `Express` использует для определения визуального контента не стандартные файлы `html`, а специальные сущности - представления, из которых можно создать `html` файлы.

Суть сущностей в том, что в них можно определять некоторые шаблоны, вместо которых затем вставляется динамическое содержимое с помощью `JS`.

Для работы с представлениями нужно установить пакет `hbs`:

```bash
npm i hbs
```

**По умолчанию, представления должны находиться в папке `views`.** 

В эту папку добавим файл `contact.nbs`. `nbs` - расширение по умолчанию для представлений, которые обрабатываются движком `Handlebars`.
***

## Модель представления 

Одним из преимуществ шаблонов является то, что мы можем передавать в представления на место шаблонов модели представления - специальные объекты, данные которые использует движок представлений для рендеринга.

В `app.js` определим код: 

```javascript
const express = require("express")
const app = express()

// Установка hbs в качестве движка 
app.set("view engine", "hbs")

app.use("/contact", function (request, response) {

    // Делает рендеринг содержимого файла
    response.render("contact.hbs", {
        title: "Блог о трейдинге",
        emailsVisible: true,
        emails: ["kravich13@gmail.com", "qq@gmail.com"],
        phone: "0666666666"
    })
})

app.use("/", function (request, response) {
    response.send("Главная страница")
})

app.listen(3000)
```
Порядок следующий: 

1. Для установки `Handlebars` в качестве движка вызывается функция:

```javascript
app.set("view engine", "hbs")
```

2. В `response.render()` передаётся специальный объект с четырьмя свойствами:
    * `title` - всё понятно.
    * `emailsVisible` - своего рода флаг.
    * `emails` - массив с двумя элементами.
    * `phone`- номер телефона.

Для маршрута `/contact` используется функция обработчика, которая производит рендеринг представления `contact.hbs` с помощью функции `response.render()`. Эта функция на основе представления создает страницу `html`, которая отправляется клиенту.
***

## Динамические поля и функционал js в html
Определим в `contanct.html` следующий код: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    
    <h1>{{title}}</h1>


    {{#if emailsVisible}}
    <!-- Если true -->

        <h3>Электронные адреса</h3>
        <ul>
            <!-- Перебор массива, перебираемый элемент - this -->
            {{#each emails}}
                <li>{{this}}</li>
            {{/each}}
        </ul>
    {{/if}}

    <p>Телефон: {{phone}}</p>

</body>
</html>
```

Вместо конкретных данных в коде представления используются те данные, которые определены в модели (`app.js`). Чтобы обратиться к свойствам модели - указывается свойство в двойных круглых скобках: `{{title}}`. 

При рендеринге представлений вместо подобных выражений будут вставляться значения соответствующих свойств модели из `app.js`.

Некоторые моменты: 

* Открывающий тег функционала js - `{{#if/each}}`.

* Закрывающий тег функционала js - `{{/if/each}}`.
*** 

## Изменение пути к представлениям

Как было сказано выше - по умолчанию представления перемещаются в папку `views`, но можно выбрать другую папку. Для этого необходимо установить параметр `views`:

```javascript
const express = require("express")
const app = express()
  
app.set("view engine", "hbs")

// С папки views на папку templates
app.set("views", "templates")
 
app.use("/contact", function (request, response) {
      
    response.render("contact")
})
 
app.listen(3000)
```