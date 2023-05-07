# Angular

- [Angular](#angular)
  - [Установка и запуск](#установка-и-запуск)
  - [Компоненты](#компоненты)
  - [Работа со стейтами](#работа-со-стейтами)
    - [Стейт в компоненте](#стейт-в-компоненте)
    - [Итерация массива из родительского компонента (контекст)](#итерация-массива-из-родительского-компонента-контекст)
  - [Рендеринг](#рендеринг)
    - [Базовые понятия](#базовые-понятия)
    - [Рендер компонента внутри компонента](#рендер-компонента-внутри-компонента)
  - [Работа с формами](#работа-с-формами)
    - [Подключение](#подключение)
    - [Работа с input text](#работа-с-input-text)
    - [FormGroup \&\& FormControl](#formgroup--formcontrol)
    - [Валидация](#валидация)
  - [Сервисы (как redux-thunk)](#сервисы-как-redux-thunk)
    - [Создание сервиса](#создание-сервиса)
    - [Запрос при рендере страницы](#запрос-при-рендере-страницы)
    - [Обработка ошибок](#обработка-ошибок)
  - [Pipe](#pipe)
  - [Директивы](#директивы)

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

### Базовые понятия

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

### Рендер компонента внутри компонента

Чтобы отрисовать компонент внутри компонента:

```html
<!-- app.compoment.html -->

<app-modal>
  <app-create-product></app-create-product>
</app-modal>
```

И определяем в самом родительском компоненте `app-modal` конкретное место, где хотим отрисовать `app-create-product`:

```html
<!-- modal-component.html -->

<div class="container">
  <div class="modal">
    <h1>Add product</h1>

    <!-- место, где будет рендериться вложенный компонент -->
    <ng-content></ng-content>
  </div>
</div>
```

---

## Работа с формами

### Подключение

Добавляем модуль формы в проект:

```ts
// app.module.ts

@NgModule({
  imports: [..., FormsModule, ReactiveFormsModule],
})
export class AppModule {}
```

### Работа с input text

Обращаемся к стейту `term` из `app.component.ts`:

```html
<!-- app.component.html -->

<input placeholder="Filter products..." [(ngModel)]="term" />
```

В `Pipe` реализуем такую логику:

```ts
transform(products: IProduct[], search: string): IProduct[] {
  return products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
}
```

Рендерим сам инпут для фильтрации элементов:

```html
<!-- app.component.html -->

<input placeholder="Filter products..." [(ngModel)]="term" />
```

И теперь рендерим изменяемый массив `product` по введенной строке `term` из инпута:

```html
<div *ngIf="products$ | async as products">
  <!-- после массива products через | вводим наш pipe filterProducts и передаём в него стейт term (2 аргумент)-->
  <app-about
    *ngFor="let product of products | filterProducts : term; let i = index"
    [product]="product"
  ></app-about>
</div>
```

### FormGroup && FormControl

Создаём стейт с формой:

```ts
// create-product.component.ts
import { FormControl, FormGroup } from '@angular/forms';

export class CreateProductComponent implements OnInit {
  ngOnInit() {}

  form = new FormGroup({
    title: new FormControl<string>(''),
  });

  submit() {
    console.log(this.form.value);
  }
}
```

Есть поле `title`, которое теперь можно связать с формой и инпутом:

```html
<!-- create-product.html -->

<!-- 1) подвязываем форму к FormGroup -->
<!-- 2) при sumbit вызываем функцию submit из компонента -->
<form [formGroup]="form" (submit)="submit()">
  <!-- 3) подвязываем title из стейта к инпуту -->
  <input placeholder="Product name" formControlName="title" />

  <button type="submit">Create</button>
</form>
```

### Валидация

Есть встроенный валидатор, который используется вместе с `FormControl`:

```ts
// create-product.component.ts

form = new FormGroup({
  title: new FormControl<string>('', [
    Validators.required,
    Validators.minLength(6),
  ]),
});

// создаём геттер title, чтобы использовать в шаблоне html
get title() {
  return this.form.controls.title;
}
```

И теперь используем эту валидацию, как хотим:

```html
<!-- create-product.component.html -->

<!-- Если есть ошибка по валидатору minLenght и если касались инпута -->
<p *ngIf="title.errors?.['minlength'] && title.touched" class="error">
  Fill title with min length 6
</p>
```

---

## Сервисы (как redux-thunk)

### Создание сервиса

Создаём папку `services` в `app` директории и создаём сервис:

```ts
// products.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: { limit: 5 },
      }),
    });
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

### Запрос при рендере страницы

Теперь в `app` компоненте создаём стейти для загрузки данных.

Отправку запроса можно сделать двумя образами.

1. Отправка через обычный подход:

   ```ts
   // app.component.ts

   export class AppComponent implements OnInit {
     title = 'first-project';

     loading = false;
     products: IProduct[] = [];

     constructor(private productsService: ProductsService) {}

     ngOnInit() {
       this.loading = true;

       this.productsService.getAll().subscribe((products) => {
         this.products = products;
         this.loading = false;
       });
     }
   }
   ```

2. Отправка через стримы

   ```ts
   // app.component.ts

   export class AppComponent implements OnInit {
     title = 'first-project';

     loading = false;
     products$: Observable<IProduct[]>;

     constructor(private productsService: ProductsService) {}

     ngOnInit() {
       this.loading = true;

       this.products$ = this.productsService.getAll().pipe(
         tap(() => {
           this.loading = false;
         }),
       );
     }
   }
   ```

   и теперь нужно поменять сам рендеринг `html` компонента:

   ```html
   <!-- app.component.html -->

   <app-about
     *ngFor="let product of products$ | async; let i = index"
     [product]="product"
   ></app-about>
   ```

### Обработка ошибок

Можно создать отдельный сервис (как хук в реакте) для обработки ошибки:

```ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error$ = new Subject();

  constructor() {}

  handle(message: string) {
    this.error$.next(message);
  }

  clear() {
    this.error$.next('');
  }
}
```

Рреализуем этот сервис в `products` сервисе:

```ts
export class ProductsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAll(): Observable<IProduct[]> {
    // 1) Делаем ошибку в запросе
    return this.http
      .get<IProduct[]>('https://fakestoreapi.com/products1232', {
        params: new HttpParams({
          fromObject: { limit: 5 },
        }),
      })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  // 2) В сам сервис ошибки передаём ошибку
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
```

Создаём отдельный компонент для вывода глобальной ошибки:

```ts
// global-error.component.ts

export class GlobalErrorComponent implements OnInit {
  constructor(public errorService: ErrorService) {}

  ngOnInit() {}
}
```

И выводим ошибку:

```html
<!-- app.component.html -->
<app-global-error></app-global-error>

<!-- global-error.component.html -->
<div *ngIf="errorService.error$ | async as error">
  {{ error }}

  <button (click)="errorService.clear()">&times;</button>
</div>
```

---

## Pipe

Pipe по сути работает как handler в реакте, когда нужно сделать какую-то логику и вернуть уже готовые данные.

Если в реакте это делается внутри компонентов, то в ангуляре - в pipe.

Создаём его в терминале:

```bash
ng g p pipes/filter-products
```

Импортируем в главный модуль:

```ts
// app.module.ts
@NgModule({
  declarations: [..., FilterProductsPipe],
})
```

Получаем такой код, в котором реализуем то, что принимаем входными параметрами и что возвращаем:

```ts
// filter-products.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: IProduct[], search: string): IProduct[] {
    return products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  }
}
```

---

## Директивы

Директивы работают по сути своей как кастомный props для любого элемента.

Создаём:

```bash
ng g d directives/focus --skip-tests
```

Например директива, которая даёт возможность сразу фокусироваться на input при рендере страницы:

```ts
// focus.directive.ts

import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements OnInit, AfterViewInit {
  constructor(public el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
```

И теперь можно использовать как пропс в `input`:

```html
<!-- create-product.component.html -->

<input placeholder="Product name" id="title" formControlName="title" appFocus />
```
