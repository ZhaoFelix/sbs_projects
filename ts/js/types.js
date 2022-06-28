// boolean
let isFinished = true;
// number
let numb = 1;
// null
let nu = null;
// let voi: void = void
// string
let str = 'aw';
// object
let obj = {};
// any
let num31 = 23;
num31 = '23';
num31 = {};
// undefined
let und = undefined;
// array
let list = [1, 2, 3];
let list2 = [1, 2, 3];
let list3 = [1, 2, '3', true];
let list4 = [undefined, 1, true, () => { },];
//tuple
let person = [1, 'felix'];
person[0] = 2;
//person[2] = '12'
// Union 联合类型
// 限定赋值类型
let isDone = true;
isDone = 1;
isDone = '2';
// 限定赋值
let index = 1;
let isDone2;
// enum 
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["white"] = 2] = "white";
})(Color || (Color = {}));
let color = Color.green;
// void
function doThing2() {
}
function sum() {
    return 1 + 5;
}
function sum2() {
    return '';
}
function total() {
    //
    return sum();
}
// 函数类型
let doAnything = function () {
};
let doAnything2;
let doAnything3 = () => { };
let doAnything4 = () => 1; // console.log('一行代码')
doAnything4();
// 类型匹配、类型推断
let doAnything5 = function (message = "默认值") {
    console.log(message);
};
doAnything5(true);
let num4 = 5;
//num4 = '5'
let person1 = {
    name: 'felix',
    age: 12
};
console.log(person1.age);
let person2 = {
    name: 'felix',
    age: 23
};
class IPoint {
    constructor(x, y, getDis) {
        this.drawPoint = () => {
            console.log(this.x, this.y);
        };
        this.getDistances = function (p) {
            return 1;
        };
        this.x = x;
        this.y = getDis();
    }
}
let p = new IPoint(10, 100, () => { return 10; });
console.log(p.drawPoint());
// 访问修饰符
/**
 * name
 */
// public、private
// 泛型
let lastArr = (arr) => {
    return arr[arr.length - 1];
};
console.log(lastArr([1, 2, 3,]));
console.log(lastArr(['1', '2', '3']));
console.log(lastArr(['1', 2, '3']));
let lastAr = (arr) => {
    return arr[arr.length - 1];
};
console.log(lastAr([1, 2, 3,]));
console.log(lastAr(['1', '2', '3']));
console.log(lastAr(['1', 2, '3']));
