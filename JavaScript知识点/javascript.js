let User = {
	count: 1,
	getCount:function(){
		return this.count
	}
}
console.log(User.getCount()); //1

let func = User.getCount;
console.log(func());//undefined

// 因为func是在window的上下文中运行的,所以访问不到count