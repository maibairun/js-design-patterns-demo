/*
 * :file description: 组合模式
 * :name: \js-design-patterns-demo\compositePattern.js
 * :author: PakJeon
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-03 22:45:55
 * :last editor: PakJeon
 * :date last edited: 2023-05-03 22:56:09
 */
/* 扫描文件夹 */
/******************************* Folder *******************************/
var Folder = function (name) {
	this.name = name;
	this.files = [];
}

Folder.prototype.add = function (file) {
	this.files.push(file);
}

Folder.prototype.scan = function () {
	console.log('开始扫描文件夹:' + this.name);
	for (var i = 0, file, files = this.files; file = files[i++]) {
		file.scan();
	}
}

/******************************* File *******************************/
var File = function (name) {
	this.name = name;
}

File.prototype.add = function () {
	throw new Error('文件下面不能再添加文件');
}

File.prototype.scan = function () {
	console.log('开始扫描文件：' + this.name);
}

var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var folder2 = new Folder('jQuery');

var file1 = new File('JavaScript 设计模式与开发实践');
var file2 = new File('精通 jQuery');
var file3 = new File('重构与模式');

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

folder.scan();
