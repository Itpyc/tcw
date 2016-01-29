define(function(require, exports, module) {
	mui.init();
	var Vue = require('../js/vue.js');
	var self = exports;
	var listArry = ['苹果', '橘子', '香蕉', '葡萄', '白菜', '芹菜', '鱼肉', '羊肉', '猪肉', '牛肉', '杨树苗', '苹果树苗', '菊花', '玫瑰花', '牡丹花', '豆干', '蜂蜜', '熏鱼', '腊肠', '大米', '小米', '薏米', '白面'];
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
	
	window.addEventListener('fromHome',function(e){
		console.log(e.detail.data);
		//遍历所有，查找是否有mui-active类的元素,有则删掉
		for(var i =0;i<5;i++){
			$('#content'+i).removeClass('mui-active');
			$('#segmentedControls a').removeClass('mui-active');
		}
		$("[href='#"+e.detail.data+"']").addClass('mui-active');
		
		$("#"+e.detail.data).addClass('mui-active');
	});
	
	//搜索商品
	document.getElementById("search").addEventListener('keydown', function(event) {
		var bol = false;
		var self = this;
		var keyword = this.value;
		console.log(listArry[0].toLowerCase());
		console.log(this.value);
		if (event.keyCode == 13) {
			console.log(listArry[0].indexOf('苹'));
			for (var i in listArry) {
				if ((this.value == listArry[i])||(listArry[i].indexOf(this.value)>=0)) {
					bol = true;
					break;
				}
			}
			if (bol) {
				mui.fire(plus.webview.getWebviewById('product-list.html'), 'productName', {
					data: this.value
				});
				mui.fire(plus.webview.getWebviewById('sort.html'), 'productName', {
					data: this.value
				});
				mui.openWindow({
					id: 'product-list.html',
				});
			}else{
				mui.toast("没有查找到相关商品");
			}
		}

	});
	Vue.directive('url', function(value) {
		this.el.addEventListener('tap', function() {
			console.log(value);
			console.log(plus.webview.getWebviewById('sort.html'));
			plus.storage.setItem("productName", value);
			mui.fire(plus.webview.getWebviewById('product-list.html'), 'productName', {
				data: value
			});
			mui.fire(plus.webview.getWebviewById('sort.html'), 'productName', {
				data: value
			});
			mui.openWindow({
				id: 'product-list.html',
			});
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