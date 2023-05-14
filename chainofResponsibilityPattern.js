/*
 * :file description: 职责链模式
 * :name: /js-design-patterns-demo/chainofResponsibilityPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-13 17:08:03
 * :last editor: PakJeon
 * :date last edited: 2023-05-13 17:27:31
 */
var order500 = function (orderType, pay, stock) {
	if (orderType === 1 && pay === true) {
		console.log('500元定金预购，得到100优惠券');
	} else {
		return 'nextSuccessor';
	}
}

var order200 = function (orderType, pay, stock) {
	if (orderType === 2 && pay === true) {
		console.log('200元定金预购，得到50优惠券');
	} else {
		return 'nextSuccessor';
	}
}

var orderNormal = function (orderType, pay, stock) {
	if (stock > 0) {
		console.log('普通购买,无优惠券');
	} else {
		console.log('手机库存不足');
	}
}

var Chain = function (fn) {
	this.fn = fn;
	this.successor = null;
}

// 指定在链中的下一个节点
Chain.prototype.setNextSuccessor = function (successor) {
	return this.successor = successor;
}

// 传递请求给某个节点
Chain.prototype.passRequest = function () {
	var ret = this.fn.apply(this, arguments);

	if (ret === 'nextSuccessor') {
		return this.successor && this.successor.passRequest.apply(this.successor, arguments);
	}
	return ret;
}

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, true, 500);


/* 用 AOP 实现职责链 */
Function.prototype.after = function (fn) {
	var self = this;
	return function () {
		var ret = self.apply(this, arguments);
		if (ret === 'nextSuccessor') {
			return fn.apply(this, arguments);
		}
		return ret;
	}
}

var order = order500yuan.after(order200yuan).after(orderNormal);

order(1, true, 500);
order(2, true, 500);
order(1, false, 500);