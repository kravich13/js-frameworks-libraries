## Асинхронность

В `Node.js` также можно использовать асинхронный код. 

Для примера, последовательная цепочка вызовов из массива:

```javascript
const delays = [2000, 3000, 1000]


viewArrms(delays)

// через 2 сек 2000
// ещё через 3 сек 3000
// ещё через 1 сек 1000

async function viewArrms (arr) {

    for (let key of arr) {
        const result = await new Promise ( (resolve) => {
            
            setTimeout( () => {
                resolve(key)
            }, key)
        })  
        console.log(result)
    }
}
```