// 当我们向isNaN传递一个参数，
// 它的本意是通过Number()方法尝试将这参数转换成Number类型，如果成功返回false，如果失败返回true。

// 所以isNaN只是判断传入的参数是否能转换成数字，并不是严格的判断是否等于NaN。
// isNaN 是否可以转换为数字(==),Number.isNaN(arg) arg === NaN

let flag = Number.isNaN("NaN"); //false

console.log(isNaN('NaN')); //true  先转成数字,再判断
console.log(flag);

console.log(Number.isNaN(1));//false
console.log(Number.isNaN(NaN));//true