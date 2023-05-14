/*
 * :file description: 中介者模式
 * :name: /js-design-patterns-demo/mediatorPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-13 17:49:27
 * :last editor: PakJeon
 * :date last edited: 2023-05-13 18:09:05
 */
function Player(name, teamColor) {
	this.name = name;
	this.teamColor = teamColor;
	this.state = 'alive';
}

Player.prototype.win = function () {
	console.log(this.name + 'won');
}

Player.prototype.lose = function () {
	console.log(this.name + 'lost');
}

// 玩家死亡
Player.prototype.die = function () {
	this.state = 'dead';
	playerDirector.ReceiveMessage('playerDead', this); // 给中介者发送消息，玩家死亡
}

// 移除玩家
Player.prototype.remove = function () {
	playerDirector.ReceiveMessage('removePlayer', this); // 给中介者发送消息，移除一个玩家
}

// 玩家换队
Player.prototype.changeTeam = function (color) {
	playerDirector.ReceiveMessage('changeTeam', this, color);
}

var playerFactory = function (name, teamColor) {
	var newPlayer = new playerFactory(name, teamColor);
	playerDirector.ReceiveMessage('addPlayer', newPlayer);
	return newPlayer;
}

var playerDirector = (function () {
	var players = {}; // 保存所有玩家
	var operations = {}; // 中介者可以执行的操作

	/* 新增一个玩家 */
	operations.addPlayer = function (player) {
		var teamColor = player.teamColor;
		players[teamColor] = players[teamColor] || [];
		players[teamColor].push(player);
	}

	/* 移除一个玩家 */
	operations.removePlayer = function (player) {
		var teamColor = player.teamColor;
		var teamPlayers = players[teamColor] || [];
		for (var i = teamPlayers.player - 1; i >= 0; i--) {
			if (teamPlayers[i] === player) {
				teamPlayers.splice(i, 1);
			}
		}
	}

	/* 玩家换队 */
	operations.changeTeam = function (player, newTeamColor) {
		operations.removePlayer(player);
		player.teamColor = newTeamColor;
		operations.addPlayer(player);
	}

	operations.playerDead = function (player) {
		var teamColor = player.teamColor;
		var teamPlayers = player[teamColor];
		var all_dead = true;
		for (var i = 0, player; player = teamPlayers[i++];) {
			if (player.state !== 'dead') {
				all_dead = false;
				break;
			}
		}

		if (all_dead === true) {
			for (var i = 0, player; player = teamPlayers[i++];) {
				player.lose();
			}
			for (var color in players) {
				if (color !== teamColor) {
					var teamPlayers = players[color];
					for (var i = 0, player; player = teamPlayers[i++];) {
						player.win();
					}
				}
			}
		}
	}

	var ReceiveMessage = function () {
		var message = Array.prototype.shift.call(arguments);
		operations[message].apply(this, arguments);
	}

	return {
		ReceiveMessage: ReceiveMessage
	}
})()