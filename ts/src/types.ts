
// boolean
let isFinished: boolean = true

// number
let numb: number = 1

// null
let nu:null = null

// let voi: void = void

// string
let str: string = 'aw'

// object
let obj: object = {}

// any
let num31: any = 23
num31 = '23'
num31 = { }

// undefined
let und: undefined = undefined

// array
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]
let list3 = [1, 2, '3', true]
let list4: any[] = [undefined, 1, true, ()=> {},]

//tuple
let person: [number, string] = [1, 'felix']
person[0] = 2

//person[2] = '12'

// Union 联合类型
// 限定赋值类型
let isDone: number | boolean | string | string[] = true
isDone = 1
isDone = '2'

// 限定赋值
let index: 1 | 2 | 3 | 4 = 1
let isDone2: 1 | true |  '1'


// enum 
enum Color {
 red,
 green,
 white  
}
let color = Color.green

// void
function doThing2() : void {

}

function sum() : any {
  return 1 + 5
} 

function sum2() : number | string | boolean {
    return ''
}

function total(): 1 | 2 | 3 | 4 | 5 {
  //
  return sum()
}

// 函数类型
let doAnything = function() {

}
let doAnything2: () => void
let doAnything3 = () => {}

let doAnything4 = () => 1 // console.log('一行代码')

doAnything4()

// 类型匹配、类型推断

let doAnything5 = function(message: string | boolean = "默认值") {
  console.log(message)
}
doAnything5(true)


let num4 = 5
//num4 = '5'

let person1: {
  name: string,
  age: number
} = {
  name: 'felix',
  age: 12
}

console.log(person1.age)


// 接口
interface Person {
  name: string,
  age: number
}

let person2: Person  = {
   name: 'felix',
   age: 23
}

// interface Point {
//   x:number,
//   y:number,
//   drawPoint: () => void,
//   getDistances: (point: Point) => number
// }

// class IPoint implements Point {
//   x: number
//   y: number
//   drawPoint: () => void
//   getDistances: (point: Point) => number
  

//   constructor(x:number, y: number, drawPoint: any, getDistances) {
//     this.x = x;
//     this.y = y;
//     this.drawPoint = drawPoint
//     this.getDistances = getDistances
//   }
 
// }


interface Point {
  x:number,
  y:number,
  drawPoint: () => void,
  getDistances: (point: Point) => number
}

class IPoint implements Point {
  x: number
  public y: number
  
  constructor(x: number, y: number, getDis: () => number) {
    this.x = x 
    this.y = getDis() 
  }

  drawPoint = () => {
    console.log(this.x, this.y)
  }

  getDistances = function(p: Point) :  number {
      return 1
  }
}

let p = new IPoint(10, 100, (): number => { return 10})
console.log(p.drawPoint())

// 访问修饰符
/**
 * name
 */
// public、private



// 泛型
let lastArr = <T>(arr: T[]) => {
  return arr[arr.length - 1]
}

console.log(lastArr([1, 2, 3,]))
console.log(lastArr(['1', '2', '3']))
console.log(lastArr(['1', 2, '3']))


let lastAr = (arr: any[]) => {
  return arr[arr.length - 1]
}

console.log(lastAr([1, 2, 3,]))
console.log(lastAr(['1', '2', '3']))
console.log(lastAr(['1', 2, '3']))
