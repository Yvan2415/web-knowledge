let a = [1,2,3,4,5];
// a.fill(0,4,7);
console.log(a.copyWithin(2,0,1));//[ 1, 2, 1, 4, 5 ] (start,start1,length)
console.log(a.fill(0,0,4));//[ 0, 0, 0, 0, 5 ] 用一个固定的数来填充数组(arg,start,end)
console.log(a.includes(4)) //true
console.log(a.indexOf(4)); //3
console.log(a.slice(1));
 
let flag = a.find((item)=>{ //找出符合条件的数组
    return item > 3;
});
console.log(flag); //false

let arr = [1,2,3,4,5,6];
let slice = arr.slice(1,4);
console.log(arr,slice);//[ 1, 2, 3, 4, 5, 6 ], [ 2, 3, 4 ]

let arr2 = [1,2,3,4,5,6];
// let splice = arr.splice(1,2);
// console.log(arr2,splice);//[ 1, 2, 3, 4, 5, 6 ] [ 2, 3 ]

let splice2 = arr2.splice(1,0,7,7,7)
console.log(arr2);//[1, 7, 7,7, 2, 3,4, 5, 6]


let arr3 = [1,2,3,4,5];
let iii = arr3.slice(0,3); //含头不含尾
console.log(iii);

let index = arr3.indexOf(4);
let lastIndex = arr3.lastIndexOf(5);
console.log(index);
console.log(lastIndex);


