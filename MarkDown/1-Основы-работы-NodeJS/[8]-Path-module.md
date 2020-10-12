# Модуль Path

Модуль Node js Path является встроенным и предоставляет набор для работы с путями в файловой системой.

Подключение: 

```javascript
const path = require("path")
```

Основные используемые методы модуля `Path`:

* `basename()` - возвращает конечную часть пути: 

    ```javascript
    // Просто передаваемый путь

    path.basename("[8]-Path-module/app.js")) // app.js
    path.basename("Practica/[8]-Path-module/app.js") // app.js

    path.basename("/srv/app/app.js", ".js") // app
    ```
    * первым параметром принимает путь;
    * вторым параметром (необязателен) - расширение файла, которое нужно убрать.

* `dirname()` - возвращает директорию переданного пути: 

    ```javascript
    path.dirname("/srv/app/app.js", ".js") // /srv/app
    ```

* `extname()` - возвращает расширение файла переданного пути: 

    ```javascript
    path.extname('/srv/app/app.js') // .js
    ```

* `isAbsolute()` - `true`, если переданный путь является абсолютным: 

    ```javascript
    path.isAbsolute('/srv/app/app.js') // true
    path.isAbsolute('srv/app/app.js') // false
    ```

* `join()` - принимает неограниченное количество составных частей пути, включая возвраты в родительские директории, и возвращает полученный в результате путь:

    ```javascript
    path.join('/srv/app', '../config/..', 'app/app.js') // \srv\app\app.js
    ```

* `normalize()` - корректирует переданный путь в нормальный вид: 

    ```javascript
    path.normalize("/srv///app///app.js") // /srv/app/app.js
    ```

* `parse()` - разбивает переданный путь на элементы и возвращает объект со следующими свойствами: 

    ```javascript
    path.parse("/srv/app/app.js")
    // { root: '/', dir: '/srv/app', base: 'app.js', ext: '.js', name: 'app' }
    ```

    * `root` - корень пути;
    * `dir` - директория;
    * `base` - конечная часть пути;
    * `ext` - расширение файла;
    * `name` - имя файла (директории) без расширения.

* `resolve()` - принимает часть пути и возвращает абсолютный путь к переданному файлу вторым параметром:

    ```javascript
    path.resolve('[8]-Path-module', 'app.js')

    // /home/vladislav/Dev/js/Node-js/Practica/1-Основы-Node-js/[8]-Path-module/[8]-Path-module/app.js
    ```