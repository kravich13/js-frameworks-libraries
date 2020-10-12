# Строки URL и объекты URL

Строка `URL`-адреса - это структурированная строка, содержащая несколько значимых компонентов. При анализе возвращается объект `URL`, содержащий свойства для каждого из этих компонентов.

Подключение: 

```javascript
const myURL = new URL("https://kravich.com/)
```
***

## Методы URL

* ### `new URL(input[,base])`
    * `input` - string. Абсолютный или относительный входной `URL`-адрес для анализа. Если `input` относительно, то `base` обязательно. Если `input` абсолютный, `base` игнорируется.
    * `base` - string | `URL` Базовый `URL`-адрес для разрешения, если `input` не является абсолютным.

    Создает новый `URL` объект, анализируя `input` относительный объект `base`. Если `base` передается как строка, она будет проанализирована эквивалентно `new URL(base)`.

    ```javascript
    const myUrl = new URL("/foo", "https://kravich.com/")
    console.log(myUrl.href) // https://kravich.com/foo
    ```

    `TypeError` Будет выдано, если `URL`-адреса `input` или `base` недействительны:

    ```javascript
    const myURL = new URL({ toString: () => 'https://kravich.com/' })
    console.log(myURL.href) // https://kravich.com/
    ```

* ### `url.href`
    Получает и задает сериализованный `URL`-адрес.

    В случаях, когда заранее неизвестно, `input` является ли абсолютный `URL`-адрес и `base` предоставляется ли, рекомендуется проверить, соответствует `origi` nли `URL` объект ожидаемому значению:


    ```javascript
    let myURL = new URL("http://Kravich.com/", "https://kravich.com/")
    console.log(myURL.href) // http://kravich.com/


    myURL = new URL("https://Kravich.com/", "https://kravich.com/")
    console.log(myURL.href) // https://kravich.com/


    myURL = new URL("foo://Kravich.com/", "https://kravich.com/")
    console.log(myURL.href) // foo://Kravich.com/


    myURL = new URL("http:Kravich.com/", "https://kravich.com/")
    console.log(myURL.href) // http://kravich.com/


    myURL = new URL("https:Kravich.com/", "https://kravich.com/")
    console.log(myURL.href) // https://kravich.com/Kravich.com/


    myURL = new URL("foo:Kravich.com/", "https://kravich.com/")
    console.log(myURL.href) // foo:Kravich.com/
    ```

    Установка нового значения этого свойства эквивалентна созданию нового `URL` объекта с использованием `new URL(value)`. Каждое из `URL` свойств объекта будет изменено.

    Если значение, присвоенное `href` свойству, не является допустимым `URL`-адресом, `TypeError` будет выдано значение.

* ### `url.hash`

    Получает и задает фрагмент `URL`-адреса:

    ```javascript
    const myURL = new URL("https://kravich.com/foo#bar")
    console.log(myURL.hash) // #bar

    myURL.hash = "baz"
    console.log(myURL.href) // https://kravich.com/foo#baz
    ```

    Недействительные символы `URL`-адреса, включенные в значение, присвоенное `hash` свойству, кодируются в процентах. 

* ### `url.host`

    Получает и задает хост-часть `URL`-адреса:

    ```javascript
    const myURL = new URL("https://kravich.com:83/foo")
    console.log(myURL.host) // kravich.com:83

    myURL.host = "kravich.com:13"
    console.log(myURL.href) // https://kravich.com:13/foo
    ```

    Недопустимые значения хоста, присвоенные `host` свойству, игнорируются.

* ### `url.hostname`

    Получает и задает часть `URL`-адреса, содержащую имя узла. Ключевое различие между `url.host` и `url.hostname` заключается в том, что в `url.hostname` не входит порт:

    ```javascript
    const myURL = new URL("https://kravich.com:83/foo")
    console.log(myURL.hostname) // kravich.com

    myURL.hostname = "kravich.com:13"
    console.log(myURL.href) // https://kravich.com:13/foo
    ```

    Недопустимые значения имени хоста, присвоенные `host` nameсвойству, игнорируются.

* ### `url.origin`

    Получает доступную только для чтения сериализацию источника `URL`-адреса:

    ```javascript
    const myURL = new URL("https://kravich.com/foo/bar?baz")
    console.log(myURL.origin) // https://kravich.com
    ```

* ### `url.password`

    Получает и задает часть `URL`-адреса, содержащую пароль:

    ```javascript
    const myURL = new URL("https://kravich:13@gmail.com")
    console.log(myURL.password) // 13

    myURL.password = "666"
    console.log(myURL.href) // https://kravich:666@gmail.com/
    ```

    Недействительные символы `URL`-адреса, включенные в значение, присвоенное `password` свойству, кодируются в процентах.

* ### `url.pathname`
  
    Получает и задает часть пути URL-адреса.

    ```javascript
    const myURL = new URL("https://kravich.com/abc/xyz?123")
    console.log(myURL.pathname) // /abc/xyz

    myURL.pathname = "/abcdef"
    console.log(myURL.href) // https://kravich.com/abcdef?123
    ```

    Недействительные символы `URL`-адреса, включенные в значение, присвоенное `pathname` свойству, кодируются в процентах.

* ### `url.protocol`

    Получает и задает протокольную часть `URL`-адреса:

    ```javascript
    const myURL = new URL("http://kravich.com")
    myURL.protocol = "https"
    console.log(myURL.href) // https://kravich.com/
    ```

    Недействительные значения протокола `URL`, присвоенные `protocol` свойству, игнорируются.


* ### `url.search`

    Получает и задает протокольную часть `URL`-адреса:

    ```javascript
    const myURL = new URL("https://kravich.com/abc?123")
    console.log(myURL.search) // 123

    myURL.search = "abc=xyz"
    console.log(myURL.href) // https://kravich.com/abc?abc=xyz
    ```

    Любые недопустимые символы `URL`, появляющиеся в значении, присвоенном `search` свойству, будут закодированы в процентах.

* ### `url.username`

    Получает и задает часть `URL`-адреса для имени пользователя:

    ```javascript
    const myURL = new URL("http://kravich:13@gmail.com")
    console.log(myURL.username) // kravich

    myURL.username = "Vlad-Kravich"
    console.log(myURL.href) // http://Vlad-Kravich:13@gmail.com/
    ```

    Любые недопустимые символы `URL`, появляющиеся в значении, присвоенном `username` свойству, будут закодированы в процентах.

