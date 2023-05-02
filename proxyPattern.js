/*
 * :file description: 
 * :name: \js-design-patterns-demo\proxyPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-02 10:33:21
 * :last editor: PakJeon
 * :date last edited: 2023-05-02 11:10:29
 */
// 例子1：通过虚拟代理实现图片预加载
var myImage = (function () {
	var imgNode = document.createElement('img');
	document.body.appendChild(imgNode);

	return function (src) {
		imgNode.src = src;
	}
})();

var proxyImage = (function () {
	var img = new Image;

	img.onload = function () {
		myImage(this.src);
	}

	return function (src) {
		myImage('file:// /C:/Users/loading.gif');
		img.src = src
	}
})

// 例子2：虚拟代理合并 HTTP 请求
var synchronousFile = function (id) {
	console.log('开始同步文件, id 为: ' + id)
}

var proxySynchronousFile = (function () {
	var cache = [],  // 保存一段时间内需要同步的 id
		timer;

	return function (id) {
		cache.push(id);
		if (timer) { // 保证不会覆盖已经启动的定时器
			return;
		}

		timer = setTimeout(() => {
			synchronousFile(cache.join(','));  // 2秒后向本体发送需要同步的 ID 集合
			clearTimeout(timer);
			timer = null;
			cache.length = 0;
		}, 2000)
	}
})();


// 例子3：用缓存代理计算乘积
var mult = function () {
	console.log('开始计算乘积');
	var a = 1;
	for (var i = 0, l = arguments.length; i < l; i++) {
		a = a * arguments[i];
	}
	return a;
}

var proxyMult = (function () {
	var cache = {};
	return function () {
		var args = Array.prototype.join.call(arguments, ',');
		if (args in cache) {
			return cache[args];
		}
		return cache[args] = mult.apply(this, arguments);
	}
})();

// 例子4：用高阶函数动态创建代理
var mult = function () {
	var a = 1;
	for (var i = 0; l = arguments.length; i < l; i++) {
		a = a * arguments[i];
	}
	return a;
}

var plus = function () {
	var a = 0;
	for (var i = 0, l = arguments.length; i < l; i++) {
		a = a + arguments[i];
	}
	return a;
}

var createProxyFactory = function (fn) {
	var cache = {};
	return function () {
		var args = Array.prototype.join.call(arguments, ',');
		if (args in cache) {
			return cache[args];
		}
		return cache[args] = fn.apply(this, arguments);
	}
}

var proxyMult = createProxyFactory(mult);
var proxyPlus = createProxyFactory(plus);

proxyMult(1, 2, 3, 4);
proxyMult(1, 2, 3, 4);
proxyPlus(1, 2, 3, 4);
proxyPlus(1, 2, 3, 4);