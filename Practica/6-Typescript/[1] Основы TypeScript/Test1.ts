let num: number = 13
let str: string = "Kravich"
let bool: boolean = true


/////// Any 
let all: any = "любой тип"
all = 13 // работает


/////////type - пишутся с большой буквы /
type Login = string
const login: Login = "kravich" // kravich

type StrNumb = string | number
const testNumb: StrNumb = "qq all"  // +
const testStr: StrNumb = 5          // +



/////// Массивы 
const arrNumb: number[] = [13, 14]
const arrStr: string[] = ["Vlad", "Kravich"]
const arrBool: boolean[] = [true, false]
const anyArr: any[] = [{ name: "Vlad", age: 23 }, { name: "Max", age: 28 }]


/////// Миксины - для каждого элемента массива свой собственный тип /
const arrNumStr: [number, string] = [13, "Aventador"]
const arrNumbStr: [number, number, string] = [13, 15, "Vlad"] 


/////// Функции: дополнение к type 
fnTest("Vlad")
fnTest("Vlad", 23)
function fnTest (name: string, age?: number): void {

    if (age) console.log(`name: ${name}, age: ${age}`)
    else console.log(`name: ${name}`)
}



// перегрузка функций
add(13, 4)       // 17
add("13", "4")    // "134"

function add (x: string, y: string): string  // вернёт строку
function add (x: number, y: number): number  // вернёт число
function add (x: any, y: any): any {    
    return x + y
}


// стрелочные функции
function sum (x: number, y: number): number {
    return x + y
}
function subtract (a: number, b: number): number {
    return a - b
}

let op: (x:number, y:number) => number;
 
op = sum
console.log(op(2, 4))  // 6
 
op = subtract
console.log(op(6, 4))  // 2



// стрелочные функции с телом
let sums = (x: number, y: number) => x * y
console.log(sum(13, 4)) // 52

let sums2 = (x, y) => x + y
console.log(sum(13, 4)) 






// К type можно установить свои значения:
type MyStr = "vlad" | "max" | "kravich"

testStrs("max")
// testStr("maximus") // // ошибка, нет такого значения

function testStrs (status: MyStr): void {
    console.log(`Привет ${status}`)
}


// Можно принять как строку и число
function getLength (obj: string | string[]) {
    return obj.length // вернёт длинну строки или массива
}
// или строка или массив
console.log(getLength(["qq", "test"])) 


/////// Интерфейс - подобие структуры схем в БД и GraphQL
interface User {
    name: string
    age: number
    crypto: string[]
}

user({ name: "Vlad", age: 23, crypto: ["eos", "eth", "ltc"] })

function user (us: User) {
    console.log(`${us.name}, ${us.age}, ${us.crypto}`)
}


interface UserInterface {
    name: string
    id: number
}

const objUser: UserInterface = {
    name: 'vlad',
    id: 13
}



class Kravich {
    name: string
    email: string
    age: number

    constructor (name: string, email: string, age: number) {
        this.name = name
        this.email = email
        this.age = age

        console.log(`Создан Кравич ${this.name}`)
    }
}

const vlad = new Kravich("Vlad", "kravich13@gmail.con", 23)
