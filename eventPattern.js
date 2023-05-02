/*
 * :file description: 发布-订阅模式
 * :name: \js-design-patterns-demo\eventPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-02 22:34:27
 * :last editor: PakJeon
 * :date last edited: 2023-05-02 23:29:42
 */
var Event = (function () {
	var clientList = {}, listen, trigger, remove;

	listen = function (key, fn) {
		if (!clientList[key]) {
			clientList[key] = [];
		}
		clientList[key].push(fn);
	};

	trigger = function () {
		var key = Array.prototype.shift.call(arguments);
		var fns = clientList[key];
		if (!fns || fns.length === 0) {
			return false;
		}
		for (var i = 0, fn; fn = fns[i]; i++) {
			fn.apply(this, arguments);
		}
	};

	remove = function (key, fn) {
		var fns = clientList[key];
		if (!fns) {
			return false;
		}
		if (!fn) {
			fns && (fns.length = 0);
		} else {
			for (var l = fns.length - 1; l >= 0; l--) {
				var _fn = fns[l];
				if (_fn === fn) {
					fns.splice(l, 1);
				}
			}
		}
	}

	return {
		listen,
		trigger,
		remove,
	}
})();

Event.listen('squareMeter88', function (price) {  // 订阅消息
	console.log('价格 = ' + price);
})

Event.trigger('squareMeter88', 200000);  // 发布消息