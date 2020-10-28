# Router

`Router` позволяет определить дочерние подмаршруты со своими обработчиками относительно некоторого главного маршрута. Пример: 

```javascript
const express = require("express")
const app = express()

app.use("/about", function (request, response) {
    response.send("О сайте")
})


/// Все три use относятся к корню products
app.use("/products/create", function (request, response) {
    response.send("Добавление товара")
})

app.use("/products/:id", function (request, response) {
    response.send(`Товар: ${request.params.id}`)
})

app.use("/products/", function (request, response) {
    response.send("Список товаров")
})
/// Все три use относятся к корню products


app.use("/", function (request, response) {
    response.send("Главная страница")
})

app.listen(3000)
```

Здесь всего пять маршрутов, но три из них начинаются с `/products`. Объект `Router` позволяет связать подобный функционал в одно целое и упростить управление им.

Перезапись примера выше на `Router`:

```javascript
const express = require("express")
const app = express()

const productRouter = express.Router()

// Сопоставляем роутер с конечной точкой /products
app.use("/products", productRouter)


// Определение маршрутов и их обработчиков внутри роутера
productRouter.use("/create", function (request, response) {
    response.send("Добавление товара")
})

productRouter.use("/:id", function (request, response) {
    response.send(`Товар: ${request.params.id}`)
})

productRouter.use("/", function (request, response) {
    response.send("Список товаров")
})
// Определение маршрутов и их обработчиков внутри роутера


app.use("/about", function (request, response) {
    response.send("О сайте")
})

app.listen(3000)
```

Здесь определён объект `productRouter`, который обрабатывает все запросы по маршруту `/products/`. Это главный маршрут. 

Однако в рамках этого маршрута может быть подмаршрут `/` со своим обработчиком, а также подмаршруты `/:id` и `/create`, которые также имеют свои обработчики.

* ### Адресная строка:

```bash
# 1)
localhost:3000/products

# 2) 
localhost:3000/products/4
```

* ### `HTML` страница: 

```
Список товаров

Товар 4
```
*** 




## Обработчики маршрутов

Для обработки запроса можно указать несколько функций обратного вызова подобно middleware. 

Единственным исключением является то, что эти обратные вызовы могут инициировать `next('route')` для обхода остальных обратных вызовов маршрута. С помощью этого механизма можно включить в маршрут предварительные условия, а затем передать управление последующим маршрутам, если продолжать работу с текущим маршрутом не нужно.


Один маршрут может обрабатываться несколькими функциями обратного вызова (**объект next обязателен**): 

```javascript
app.get("/example/b", function (req, res, next) {
    console.log("перешел на страницу")
    next()
}, function (req, res) {
    res.send("Привет b")
})

app.listen(3000)
```

Массив функций обратного вызова может обрабатывать один маршрут:

```javascript
const cb0 = function (req, res, next) {
    console.log("Один")
    next()
}

const cb1 = function (req, res, next) {
    console.log("Два")
    next()
}

const cb2 = function (req, res, next) {
    res.send("Привет на C")
}

app.get("/example/c", [cb0, cb1, cb2])

app.listen(3000)
```

Маршрут может обрабатываться сочетанием независимых функций и массивов функций:

```javascript
const cb0 = function (req, res, next) {
    console.log("Один")
    next()
}

const cb1 = function (req, res, next) {
    console.log("Два")
    next()
}

app.get("/example/d", [cb0, cb1], function (req, res, next) {
    console.log("Сочетание массива и встроенной функции, три")
    next()
}, function (req, res) {
    res.send("Привет d")
})

app.listen(3000)
```
***
## app.route()

Метод `app.route()` позволяет создавать обработчики маршрутов, образующие цепочки, для пути маршрута:

```javascript
app.route("/kravich")
    .get( function (req, res) {
        res.send("Прочитать блог")
    })
    .post( function (req, res) {
        res.send("Добавить в блог")
    })
    .put( function (req, res) {
        res.send("Обновить блог")
    })

app.listen(3000)
```

