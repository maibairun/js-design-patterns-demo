/*
 * :file description: 模板方法模式
 * :name: \js-design-patterns-demo\templateMethodPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-04 23:09:06
 * :last editor: PakJeon
 * :date last edited: 2023-05-04 23:28:33
 */
// 泡茶 or 泡咖啡
var Beverage = function (params) {
	var boilWater = function () {
		console.log('把水煮沸')
	}

	var brew = params.brew || function () {
		throw new Error('必须传递 brew 方法');
	}

	var pourInCup = params.pourInCup || function () {
		throw new Error('必须传递 pourInCup 方法');
	};

	var addCondiments = params.addCondiments || function () {
		throw new Error('必须传递 addCondiments 方法');
	};

	var F = function (){};

	F.prototype.init = function () {
		boilWater();
		brew();
		pourInCup();
		addCondiments();
	}

	return F;
}

var Coffee = Beverage({
	brew: function () {
		console.log('用沸水冲泡咖啡');
	},
	pourInCup: function () {
		console.log('把咖啡倒进被子');
	},
	addCondiments: function () {
		console.log('加糖和牛奶');
	}
});

var Tea = Beverage({
	brew: function () {
		console.log('用沸水冲泡茶叶');
	},
	pourInCup: function () {
		console.log('把茶倒进被子');
	},
	addCondiments: function () {
		console.log('加柠檬');
	}
})

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
Tea.init();