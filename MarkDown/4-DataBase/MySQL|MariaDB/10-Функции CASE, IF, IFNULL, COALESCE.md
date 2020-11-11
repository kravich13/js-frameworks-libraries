# Функции CASE, IF, IFNULL, COALESCE

## CASE

Суть `CASE` точно такая же, как и `Switch` в JS.

```sql
CASE 
    WHEN условие1 THEN результат1
    WHEN условие2 THEN результат2
    [ELSE альтернативный_результат]
END;
```

Для примера возьмем таблицу Products и используем с ней `CASE`:

```sql
SELECT ProductName, ProductCount,
CASE 
    WHEN ProductCount = 1
        THEN "Товар заканчивается"
    WHEN ProductCount = 2
        THEN "Мало товара"
    WHEN ProductCount = 3
        THEN "Есть в наличии"
    ELSE "Много товара"
END AS Category
FROM Products;

+-------------+--------------+---------------------------------------+
| ProductName | ProductCount | Category                              |
+-------------+--------------+---------------------------------------+
| iPhone X    |            2 | Мало товара                           |
| iPhone 8    |            2 | Мало товара                           |
| iPhone 7    |            5 | Много товара                          |
| Galaxy S9   |            2 | Мало товара                           |
| Galaxy S8   |            1 | Товар заканчивается                   |
| Honor 10    |            2 | Мало товара                           |
| Nokia 8     |            6 | Много товара                          |
+-------------+--------------+---------------------------------------+
```
***

## IF

Суть точно такая же, как и в JS, а вид как в Excel.

```sql
IF(условие, значение1, значение2)
```

Если **первое** условие `true` - возвращается **первое** значение, `false` - **второе** значение:

```sql
SELECT ProductName, Manufacturer,
    IF(ProductCount > 3, "Много товара", "Мало товара") AS Category
FROM Products;

+-------------+--------------+-------------------------+
| ProductName | Manufacturer | Category                |
+-------------+--------------+-------------------------+
| iPhone X    | Apple        | Мало товара             |
| iPhone 8    | Apple        | Мало товара             |
| iPhone 7    | Apple        | Много товара            |
| Galaxy S9   | Samsung      | Мало товара             |
| Galaxy S8   | Samsung      | Мало товара             |
| Honor 10    | Huawei       | Мало товара             |
| Nokia 8     | HMD Global   | Много товара            |
+-------------+--------------+-------------------------+
```
***

## IFNULL

Эта функция проверяет значение некоторого выражения. Если оно равно `NULL` - то возвращает значение, которое передаётся в качестве **второго** параметра:

```sql
IFNULL(выражение, значение)
```

Для примера возьмем таблицу с клиентами:

```sql
CREATE TABLE Clients
(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FIrstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    Phone VARCHAR(20) NULL,
    Email VARCHAR(20) NULL
);

INSERT INTO Clients (FirstName, LastName, Phone, Email)
VALUES ("Vlad", "Kravich", "38066590", "kravich13@gmail.com"),
("Max", "Kravich", NULL, NULL);
```

И применим при получении данных `IFNULL`:

```sql
SELECT FirstName, LastName, 
    IFNULL(Phone, "Не определено") AS Phone,
    IFNULL(Email, "неизвестно") AS Email
FROM Clients;

+-----------+----------+---------------------------+----------------------+
| FirstName | LastName | Phone                     | Email                |
+-----------+----------+---------------------------+----------------------+
| Vlad      | Kravich  | 38066590                  | kravich13@gmail.com  |
| Max       | Kravich  | Не определено             | неизвестно           |
+-----------+----------+---------------------------+----------------------+
```
***

## COALESCE

Эта функция принимает список значений и возвращает **первое** из них, которое не равно `NULL`:

```sql
COALESCE(выраж1, выраж2, выраж3)
```
**Если же условие равно `NULL` - можно ему указать название в параметре.**

К примеру выберем из Clients пользователей и в их контактах определим либо телефон, либо почту, если они не равны `NULL`:

```sql
SELECT FirstName, LastName,
    COALESCE(Phone, Email, "Не определено") AS Contacts
FROM Clients;

+-----------+----------+---------------------------+
| FirstName | LastName | Contacts                  |
+-----------+----------+---------------------------+
| Vlad      | Kravich  | 38066590                  |
| Max       | Kravich  | Не определено             |
+-----------+----------+---------------------------+
```