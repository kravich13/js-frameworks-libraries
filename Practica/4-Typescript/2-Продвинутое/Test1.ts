function mergeObjects<T extends object, R extends object>(a: T, b: R) {
  return Object.assign({}, a, b);
}

// name, crypto
const obj1 = mergeObjects({ name: 'vlad' }, { crypto: true });

//
interface ILength {
  length: number;
}

function getLength<T extends ILength>(value: T): { value: T; count: string } {
  return { value, count: `Длина ${value.length}` };
}
getLength('Vlad Kravich');

//
interface IUser {
  name: string;
  age: number;
}

function fn(name: string, age: number): IUser {
  const user: Partial<IUser> = {};

  if (age >= 20) {
    user.age = age;
    // нет такого поля
  }

  return user as IUser;
}

//
const users: Readonly<string[]> = ['Vlad', 'Max'];
users[1];
