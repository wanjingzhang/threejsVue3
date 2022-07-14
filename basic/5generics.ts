// 泛型（Generics）
// 创建可复用组件的工具，我们称之为泛型（generics）。利用泛型，我们可以创建一个支持众多类型的组件，这让用户可以使用自己的类型消费（consume）这些组件。
function identity(arg: number): number {
    return arg;
  }
  function identity<Type>(arg: Type): Type {
    return arg;
  }

  let output = identity<string>("myString"); // let output: string

  
    