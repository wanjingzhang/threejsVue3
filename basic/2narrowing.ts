// 1. in 操作符收窄 
 


type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal; // (parameter) animal: Fish | Human
  } else {
    animal; // (parameter) animal: Bird | Human
  }
}




