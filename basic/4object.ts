// 接口也可以继承多个类型
interface Colorful {
    color: string;
} 
interface Circle {
    radius: number;
} 

interface ColorfulCircle extends Colorful, Circle {}
const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
};

// 交叉类型（Intersection types）的方法，用于合并已经存在的对象类型。
interface Colorful {
    color: string;
}
interface Circle {
    radius: number;
} 
type ColorfulCircle = Colorful & Circle;
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
} 
// okay
draw({ color: "blue", radius: 42 });

// 泛型对象类型（Generic Object Types）
interface Box<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
} 
let boxA: Box<string> = { contents: "hello" };
boxA.contents;        
// (property) Box<string>.contents: string
let boxB: StringBox = { contents: "world" };
boxB.contents;     
// (property) StringBox.contents: string


// ReadonlyArray 类型（The ReadonlyArray Type）
// ReadonlyArray 是一个特殊类型，它可以描述数组不能被改变。
function doStuff(values: ReadonlyArray<string>) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    // ...but we can't mutate 'values'.
    values.push("hello!");
    // Property 'push' does not exist on type 'readonly string[]'.
}
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
// TypeScript 也针对 ReadonlyArray<Type> 提供了更简短的写法 readonly Type[]
function doStuff(values: readonly string[]) {}  

// 元组类型（Tuple Types）
// 元组类型是另外一种 Array 类型，当你明确知道数组包含多少个元素，并且每个位置元素的类型都明确知道的时候，就适合使用元组类型。
type StringNumberPair = [string, number];

function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args;
    // ...
  }  
//   基本等同于：    
  function readButtonInput(name: string, version: number, ...input: boolean[]) {
    // ...
  } 

  // readonly Tuples
  function doSomething(pair: readonly [string, number]) {
    pair[0] = "hello!";
    // Cannot assign to '0' because it is a read-only property.
  }