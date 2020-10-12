const util = require("util")


// util.format

// строка
console.log(util.format('%s', "kravich13")) // kravich13

// число
console.log(util.format('%d', 13)) // 13

// объект
console.log(util.format("%o", {name: "Vlad", age: 23})) 
// { name: 'Vlad', age: 23 }



// различные комбинации
console.log(util.format("%s:%d", "age", 23)) // age:23

console.log(util.format("%s:%d", "age")) // age:%d

console.log(util.format("%s:%s", "vlad", "max", "kravich")) 
// vlad:max kravich

console.log(util.format(1, 2, 3)) // 1 2 3

console.log(util.format("%% %s")) // %% %s"

