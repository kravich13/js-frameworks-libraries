# Angular

- [Angular](#angular)
  - [Установка и запуск](#установка-и-запуск)
  - [Компоненты](#компоненты)
  - [Работа со стейтами](#работа-со-стейтами)
    - [Стейт в компоненте](#стейт-в-компоненте)
    - [Итерация массива из родительского компонента (контекст)](#итерация-массива-из-родительского-компонента-контекст)
  - [Рендеринг](#рендеринг)
  - [Сервисы (как redux-thunk)](#сервисы-как-redux-thunk)

Основная суть Ангуляра в том, что он имеет модульный подход. Здесь с самого начала предустановлен Typescript, проект имеет чёткую структуру и для сохранения структуры используются команды CLI для создания уже готовых и подключенных модулей.

---

## Установка и запуск

Для начала устанавливаем cli:

```bash
sudo npm i -g @angular/sli
```

Создаём:

```bash
ng new prject-name
```

У нас спросят хотим ли мы добавить роутинг и вид стилей.

Запуск:

```bash
npm run start
```

---

## Компоненты

Поскольку вся структура строится на компонентах (как и в реакте) - то нужно ей следовать. Для этого есть два пути: создавать их руками или же с помощью cli команды (приоритет).

Создание командой:

```bash
ng generate component About --skip-tests
```

Получаем такую структуру в `app` folder:

```
app
  about
    about.component.scss
    about.component.ts
  app.component.scss
  app.component.ts
  app.module.ts
  ...
```

Регистрируем компонент в проекте:

```ts
// app.module.ts

@NgModule({
  declarations: [AppComponent, AboutComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

И чтобы использовать `about.component.html` в `app.component.html` - делаем следующее:

```html
<!-- app.component.html -->

<app-about></app-about>
```

---

## Работа со стейтами

### Стейт в компоненте

Стейт нужно инициализировать прямо внутри Module класса:

```ts
// app.component.ts

export class AppComponent {
  title = 'first-project';
}
```

И чтобы вывести этот стейт в верстке, делаем так:

```html
<!-- app.component.html -->

<h1>{{ title }}</h1>
```

### Итерация массива из родительского компонента (контекст)

Объявляем массив в ролительском стейте:

```ts
// app.module.ts
export class AppComponent {
  title = 'first-project';

  products: IProduct[] = [];
}
```

И итерируем этот массив внутри `app-about`:

```html
<!-- app.component.html -->

<app-about *ngFor="let product of products; let i = index" [product]="product"></app-about>
```

И теперь используем элемент (пропс) `product`:

```html
<!-- about.component.html -->

<div>
  <img [src]="product.image" [alt]="product.title" />

  <h2>{{ product.title }}</h2>

  <p>Price: <span>{{ product.price }}</span></p>

  <button>Show Details</button>

  <p>{{ product.description }}</p>
  <p>Rate: {{ product.rating.rate }}</p>
</div>
```

---

## Рендеринг

Если нужно передать какое-то значение внутрь шаблона (тега) - используем `[]`:

```html
<img [src]="product.image" [alt]="product.title" />
<button [ngStyle]="{ background: details ? 'blue' : 'yellow' }">
  {{ details ? "Hide" : "Show" }} Details
</button>
```

Если нужно обработать какие-то иненты - используем `()`:

```html
<button (click)="details = !details" [ngStyle]="{ background: details ? 'blue' : 'yellow' }">
  {{ details ? "Hide" : "Show" }} Details
</button>
```

---

## Сервисы (как redux-thunk)

Создаём папку `services` в `app` директории и создаём сервис:

```ts
// products.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsServce {
  constructor(private http: HttpClient) {}

  getAll() {
    this.http.get('https://fakestoreapi.com/products');
  }
}
```

И регистрируем сервис в модуле `app`:

```ts
@NgModule({
  ...
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
})
export class AppModule {}
```
