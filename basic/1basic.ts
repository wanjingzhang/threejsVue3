console.log("Hello world!")

// This is an industrial-grade general-purpose greeter function:
function greet(person:string, date:Date) :void{
  console.log(`Hello ${person}, today is ${date}!`);  // downleveling
}
greet("Brendan",new Date());


let msg:string = "hello there!";


  
// 1. 对象类型（Object Types）
function printCoord(pt: { x: number; y?: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt?.y);
}
printCoord({ x: 3});

// 2. 联合类型（Union Types）
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);   printId("202"); 
// Error
// printId({ myID: 22342 });
 
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

// 3. 类型别名（Type Aliases）
type Point2 = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord2(pt: Point2) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
} 
printCoord2({ x: 100, y: 100 });

// 4. 接口（Interfaces）
interface Point3 {
  x: number;
  y: number;
} 
function printCoord3(pt: Point3) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
} 
printCoord3({ x: 100, y: 100 });

// 5. 类型断言（Type Assertions）
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

// 6. 字面量类型结合联合类型
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre"); // 参数未指定 

// 数字字面量
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// string 不能赋值给GET， 2个解决方法
declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req = { url: "https://example.com", method: "GET" }; 
const req1 = {url: "https://example.com", method: "GET" as "GET"} // 方法1 我有意让 req.method 的类型为字面量类型 "GET"
handleRequest(req.url, req.method as "GET"); // 方法2 我知道 req.method 的值是 "GET"”

// 7. 非空断言操作符（后缀 !）(Non-null Assertion Operator)
// 可以在不做任何检查的情况下，从类型中移除 null 和 undefined，这就是在任意表达式后面写上 ! ，这是一个有效的类型断言，表示它的值不可能是 null 或者 undefined
function liveDangerously(x?: number | null) {
  // 只有当你明确的知道这个值不可能是 null 或者 undefined 时才使用 !
  console.log(x!.toFixed());
}


// 8.枚举 Enums
// 并不是一个类型层面的增量，而是会添加到语言和运行时

// 9. 不常见的原始类型（Less Common Primitives）
// bigInt 
const oneHundred: bigint = BigInt(100); 
const anotherHundred: bigint = 100n;


