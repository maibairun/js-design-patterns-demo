/*
 * :file description: 单例模式
 * :name: \js-design-patterns-demo\sigletonPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-01 22:23:27
 * :last editor: PakJeon
 * :date last edited: 2023-05-01 22:39:30
 */
// 通用的惰性单例
var getSingle = function (fn) {
	var result;
	return function () {
		return result || (result = fn.apply(this, arguments));
	}
}

// 例子 1
var createLoginLayer = function () {
	var div = document.createElement('div');
	div.innerHTML = '我是登录浮窗';
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
}

var creatSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function () {
	var loginLayer = creatSingleLoginLayer();
	loginLayer.style.display = 'block';
}

// 例子 2
var createSignleIframe = function () {
	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);
	return iframe;
}

document.getElementById('loginBtn').onclick = function () {
	var loginLayer = getSingle(createSignleIframe);
	loginLayer.src = 'http://baidu.com';
}