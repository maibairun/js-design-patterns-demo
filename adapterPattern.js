/*
 * :file description:  适配器模式
 * :name: \js-design-patterns-demo\adapterPattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-18 22:26:48
 * :last editor: PakJeon
 * :date last edited: 2023-06-18 22:32:55
 */
var guangdongCity = {
	shenzhen: 11,
	guagnzhou: 12,
	foshan: 13,
};

var getGuangdongCity = function () {
	var guangdongCity = [
		{
			name: 'shenzhen',
			id: 11,
		},
		{
			name: 'guagnzhou',
			id: 12,
		},
	];
	return guangdongCity;
}

var render = function (fn) {
	console.log('开始渲染广东省地图');
	document.write(JSON.stringify(fn()));
}

// 地址适配器，适配新的数据格式
var addressAdapter = function (oldAddressfn) {
	var address = {};
	var oldAddress = oldAddressfn();

	for (var i = 0, c; c = oldAddress[i++];) {
		address[c.name] = c.id;
	}

	return function () {
		return address;
	}
}

render(addressAdapter(getGuangdongCity));