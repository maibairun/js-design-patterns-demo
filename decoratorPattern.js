/*
 * :file description: 装饰者模式
 * :name: \js-design-patterns-demo\decoratorPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-18 21:34:57
 * :last editor: PakJeon
 * :date last edited: 2023-06-18 21:45:07
 */
Function.prototype.before = function (beforefn) {
	const __self = this; // 保存原函数的引用
	return function () { // 返回包含了原函数和新函数的“代理”函数
		beforefn.apply(this, arguments);  // 执行新函数，且保证 this 不被劫持，新函数接受的参数也会被原封不动地传入原函数，新函数在原函数之前执行
		return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果，并且保证 this 不被劫持
	}
}

Function.prototype.after = function (afterfn) {
	const __self = this;
	return function () {
		var ret = __self.apply(this, arguments);
		afterfn.apply(this, arguments);
		return ret;
	}
}