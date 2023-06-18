/*
 * :file description: 状态模式
 * :name: \js-design-patterns-demo\statePattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-18 21:54:22
 * :last editor: PakJeon
 * :date last edited: 2023-06-18 22:25:21
 */
var Light = function () {
  this.currState = FSM.off; // 设置当前状态
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement('button');
  var self = this;

  button.innerHTML = '已关灯';
  this.button = document.body.appendChild(button);

  this.button.onclick = function () {
    self.currState.buttonWasPressed.call(self); // 把请求委托给 FSM 状态机
  };
};

/*
FSM 通常代表 "Finite State Machine"（有限状态机）。有限状态机是一种抽象的计算模型，它可以处于一系列的状态中的其中一个，且在任意时刻只能处于这些状态中的一个。
在特定条件下，状态机可以从一个状态转换到另一个状态，这种转换被称为转移。有限状态机常用于描述和实现系统或应用的行为，特别是那些可以清楚地分为几种状态，且其状态转换可以被清晰定义的系统。
例如，在游戏编程中，一个角色可能有多种状态（如行走，跳跃，攻击等），并且在不同的输入或事件下，角色的状态会发生改变（如按跳跃键时，从行走状态变为跳跃状态）。这种角色的行为可以使用有限状态机（FSM）来描述和实现。
 */
var FSM = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯');
      this.button.innerHTML = '下一次按我是开灯';
      this.currState = FSM.on;
    },
  },
  on: {
    buttonWasPressed: function () {
      console.log('开灯');
      this.button.innerHTML = '下一次按我是关灯';
      this.currState = FSM.off;
    },
  },
};

var light = new Light();
light.init();


