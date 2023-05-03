/*
 * :file description: 命令模式
 * :name: \js-design-patterns-demo\commandPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-03 17:57:05
 * :last editor: PakJeon
 * :date last edited: 2023-05-03 22:25:00
 */
/* 例子 1 模拟 街头霸王 */
var Ryu = {
	attack: function () {
		console.log('攻击');
	},
	defense: function () {
		console.log('防御');
	},
	jump: function () {
		console.log('跳跃');
	},
	crouch: function () {
		console.log('蹲下');
	},
};

// 创建命令
var makeCommand = function (receiver, state) {
	return function () {
		receiver[state]();
	}
};

var commands = {
	'119': 'jump',   // w
	'115': 'crouch', // s
	'119': 'defense',   // a
	'119': 'attack',   // d
};

// 保存命令的堆栈
var commandStack = [];

document.onkeypress = function (ev) {
	var keyCode = ev.keyCode;
	var command = makeCommand(Ryu, commands[keyCode]);

	if (command) {
		command();
		commandStack.push(command);
	}
}

// 点击播放录像
document.getElementById('replay').onclick = function () {
	var command;
	while (command = commandStack.shift()) {
		command();
	}
}

/* 宏命令 */
var closeDoorCommand = {
	execute: function () {
		console.log('关门');
	}
}

var openPcCommand = {
	execute: function () {
		console.log('开电脑');
	}
}

var openQQCommand = {
	execute: function () {
		console.log('登录QQ');
	}
}

var MacroCommand = function () {
	return {
		commandsList =[],
		add: function (command) {
			this.commandsList.push(command);
		},
		execute: function () {
			for (var i = 0, command; command = this.commandsList[i++]) {
				command.execute();
			}
		}
	}
}

var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();