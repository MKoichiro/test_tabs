/* eslint-disable */
// Variable declarations
let a: number = 1;
const b: string = 'test';

// Function
function add(x: number, y: number): number {
    return x + y;
}

// If statement
if (a === 1) {
    console.log('a is 1');
}

// For loop
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// While loop
while (a < 10) {
    a++;
}

// Switch statement
switch (b) {
    case 'test':
        console.log('b is test');
        break;
    default:
        console.log('b is not test');
}

// Class
class TestClass {
    constructor(public prop: number) {}
}

// Interface
interface TestInterface {
    prop: number;
}

// Generics
function identity<T>(arg: T): T {
    return arg;
}

// Promise
const promise = new Promise((resolve, reject) => {
    resolve('Promise resolved');
});

// Arrow function
const arrowFunc = (x: number, y: number) => x + y;

// Template literal
console.log(`The sum is ${arrowFunc(a, 10)}`);
