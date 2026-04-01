/*
    * This file serves as an entry point for the TypeScript project. It demonstrates basic TypeScript features such as type annotations, tuples, and arrays.

#  Type Annotations - explicitly defining the type of a variable
1. Basic Types - number, string, boolean, etc.
2. Tuple - a fixed-size array with specified types for each element
3. Array - a variable-size array that can hold elements of specified types
4. Enum - a way to define a set of named constants
5. Any - a type that can hold any value, effectively opting out of type checking
6. Void - a type that represents the absence of a value, often used for functions that do not return anything
7. Never - a type that represents values that never occur, often used for functions that throw exceptions or have infinite loops
8. Unknown - a type that represents any value but requires type checking before being used

*/
// const num: number = 10;
// const str: string = "Hello, TypeScript!";
// const bool: boolean = true;

// console.log(num, str, bool);

// Tuple - fixed type and size array
const tuple: [number, string] = [1, "Hello"];
console.log(tuple);

// Array - variable size and type array
const a: [number, number, string] = [1, 2, "Hello"];
console.log(a);
