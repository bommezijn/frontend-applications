// Interface creates a type that can be (re)used 
interface Example {
  test: string,
  greeting: (param:string)=>any
}
// Uses previously made interface and cohert to it.
const test:Example = {
  test: 'hello world',
  greeting: (x):any => {return console.log(`hello ${x}`)}
}
test.greeting('Nathan') //Now I can use greeting like a regular method

// I can also declare it an arrow function manner, habla is the caller that wants a string and returns a void (or any)
function greeter(habla: (x: string) => void) {
  habla('9999');
}

// print function wants a string and console log it
function print(s:string) {
  console.log(s)
}
greeter(print) //I dont get the part with the function type expression yet.

interface Animal {
  name: string
}
interface Bear extends Animal {
  honey: boolean
}

function getBear(name:string, honey:boolean) {
  return {name, honey}
}

const bear = getBear('winny', true) 
console.log(bear.name, bear.honey)


// type Animal = {
//   name: string
// }

// type Bear = Animal & {
//   honey: boolean
// }

// function getBear(name: string, honey:boolean): Object {
//   return {name, honey}
// }

// const bear = getBear('winny the pooh', true)
// console.log(bear)
