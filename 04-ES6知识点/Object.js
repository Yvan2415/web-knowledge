let obj = {
    name: 'fang',
    age: 22
}
Object.assign(obj,{
    sex:'man'
},{
    grade: '本科'
});

console.log(obj);//{ name: 'fang', age: 22, sex: 'man', grade: '本科' }


let keys = Object.keys(obj);
let values = Object.values(obj);
let entry = Object.entries(obj);

console.log(keys,values,entry);