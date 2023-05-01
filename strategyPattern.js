/*
 * :file description: 策略模式
 * :name: \js-design-patterns-demo\strategyPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-01 23:56:04
 * :last editor: PakJeon
 * :date last edited: 2023-05-01 23:59:13
 */
var strategies = {
	"S": function (salary) {
		return salary * 4;
	},
	"A": function (salary) {
		return salary * 3;
	},
	"B": function (salary) {
		return salary * 2;
	}
};

var calculateBonus = function (level, salary) {
	return strategies[level](salary);
}

console.log(calculateBonus('S', 2000)); // 8000
console.log(calculateBonus('A', 1000)); // 3000