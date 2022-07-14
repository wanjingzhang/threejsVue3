// 函数类型表达式（Function Type Expressions）
function greeter(fn: (a: string) => void) {
    fn("Hello, World");
} 
function printToConsole(s: string) {
    console.log(s);
} 
greeter(printToConsole);
  
// 类型别名（type alias）定义一个函数类型
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}

// 推断（Inference）
// TypeScript 既可以推断出 Input 的类型 （从传入的 string 数组），又可以根据函数表达式的返回值推断出 Output 的类型。
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
  } 
  // Parameter 'n' is of type 'string'
  // 'parsed' is of type 'number[]'
  const parsed = map(["1", "2", "3"], (n) => parseInt(n));

  function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
  }
   
//   约束（Constraints）
// 正是因为我们对 Type 做了 { length: number } 限制，我们才可以被允许获取 a b参数的 .length 属性。没有这个类型约束，我们甚至不能获取这些属性，因为这些值也许是其他类型，并没有 length 属性。
// 基于传入的参数，longerArray和 longerString 中的类型都被推断出来了。记住，所谓泛型就是用一个相同类型来关联两个或者更多的值。
  // longerArray is of type 'number[]'
  const longerArray = longest([1, 2], [1, 2, 3]);
  // longerString is of type 'alice' | 'bob'
  const longerString = longest("alice", "bob");
  // Error! Numbers don't have a 'length' property
  const notOK = longest(10, 100);
  // Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
  
//   参数结构
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
//  等价
type ABC = { a: number; b: number; c: number };
function sum2({ a, b, c }: ABC) {
  console.log(a + b + c);
} 