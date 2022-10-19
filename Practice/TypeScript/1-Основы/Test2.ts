// interface IVlad {
//   age: number;
//   money: number;
// }

// class Vlad implements IVlad {
//   age: number = 24;
//   money: number = 3000;
// }

// class Vlad {
//   // доступно для всех классов, которые наследуются от текущего
//   // но у инстанса - это поле недоступно
//   protected money: number = 3000;
//   public color: string = 'red';

//   constructor() {
//     this.go();
//   }

//   // доступно только внутри этого класса
//   private go() {
//     console.log('go');
//   }
// }

// class Max extends Vlad {
//   public setMoney(money: number): void {
//     this.money = money;
//   }
// }

// const max = new Max();
// max.setMoney(13000);
// max.color = 'yellow';

//
class Vlad {
  age: 24;
  cryptoCurrency: 'EOS';
}

class Max {
  age: 29;
  developer: 'middle node.js';
}

function testFn(person: Vlad | Max) {
  if (person instanceof Vlad) {
    return { info: person.age + person.cryptoCurrency };
  }

  return { info: person.age + person.developer };
}

//
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // name | age

let key: PersonKeys = 'name';

type User = {
  _id: number;
  name: string;
  email: string;
  createdAt: Date;
};

type UsersKeys = Exclude<keyof User, '_id' | 'createdAt'>; // name | email

//
/// <reference path="exportsTest.ts"/>

namespace AllTypes {
  function fn(name: User): ITest {
    return Object.assign({}, { name, age: 24 });
  }
  export const test = fn('Vlad');
}

AllTypes.test;

// function fn(str: AllTypes.User): AllTypes.ITest {
//   return Object.assign({}, { name: str, age: 24 });
// }
// fn('Vlad');
