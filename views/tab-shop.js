define(function(require, exports, module) {
	mui.init();
	var Vue = require('../js/vue.js');
	var self = exports;
	var vegetables = ['苹果', '橘子', '香蕉', '葡萄', '白菜', '芹菜'];
	var meat = ['鱼肉', '羊肉', '猪肉', '牛肉'];
	var flowers = ['杨树苗', '苹果树苗', '菊花', '玫瑰花', '牡丹花'];
	var grocery = ['豆干', '蜂蜜', '熏鱼', '腊肠'];
	var food = ['大米', '小米', '薏米', '白面'];
	//预加载页面
	var listPage = mui.preload({
		url: 'product-list.html',
		id: 'product-list.html'
	});
	Vue.directive('url', function(value) {
		this.el.addEventListener('tap', function() {
			console.log(value);
			console.log(plus.webview.getWebviewById('sort.html'));
			plus.storage.setItem("productName",value);
			mui.fire(plus.webview.getWebviewById('product-list.html'), 'product-name', {
				title: value
			});
			mui.fire(plus.webview.getWebviewById('sort.html'), 'product', {
				title: value
			});
			mui.openWindow({
				id: 'product-list.html',
			});
			
		/*	alert(plus.storage.getItem("productName"));*/
		});

	});

	var vm = new Vue({
		el: "#shop",
		data: {
			productsType: ['蔬菜瓜果', '粮油米面', '农产副食', '畜牧农产', '苗木花草'],
			vegetables: vegetables,
			meat: meat,
			flowers: flowers,
			grocery: grocery,
			food: food
		}
	});

});