let set = new Set();
set.add("1");
set.add("5")
console.log(set);
console.log(set.values());
set.delete("5");
console.log(set);

let map = new Map();
map.set("a","222");
map.set("b","fang");
map.delete("a");
console.log(map);

console.log(map.get("a"));