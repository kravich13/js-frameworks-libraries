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
