define(function(require, exports, module) {
	mui.init();
	window.addEventListener('load',function(){
		document.getElementById("input").focus();
	});
	
	
	//数据格式
	var searchClassification = [{
		id: "商品",
		searchHistory: [],
		type: ['苹果', '橘子', '香蕉', '葡萄', '白菜', '芹菜', '鱼肉', '羊肉', '猪肉', '牛肉', '杨树苗', '苹果树苗', '菊花', '玫瑰花', '牡丹花', '豆干', '蜂蜜', '熏鱼', '腊肠', '大米', '小米', '薏米', '白面'],
		pageId: ["product-list.html", "sort.html"],
		eventId: "productName"
	}, {
		id: "商铺",
		searchHistory: [],
		type: ["商铺1", "商铺2", "商铺3", "商铺4", "商铺5", "商铺6", "商铺7", "商铺8"],
		pageId: ["sellerHome.html"],
		eventId: 'shoperName'
	}, {
		id: '村志',
		searchHistory: [],
		type: ["里东村0", "里东村1", "里东村2", "里东村3", "里东村4"],
		pageId: ["cunzhiInner.html"],
		eventId: 'viliageName'
	}];
	//搜索函数,传入的参数有options：对应搜索类型的参数。value：用户输入的数值。keyCode：用户按下的软键盘的ID
	self.search = function(options, value, keyCode) {
		var listArry = options.type || '';
		var pageId = options.pageId || [];
		var eventId = options.eventId || '';
		var searchHistory = options.searchHistory || [];

		var bol = false;
		var keyword = value;
		console.log(listArry[0].toLowerCase());
		//判断软键盘按下的是哪个值
		if (keyCode == 13) {
			//判断历史记录中是否存在当前输入的内容
			for (var i in searchHistory) {
				if (keyword == searchHistory[i]) {
					searchHistory.splice(i, 1); //splice，删除从第i个开始的数据，删除1个
					break;
				}
			}
			//将搜索内容添加入搜索历史中
			searchHistory.unshift(keyword);
			vm.history = searchHistory;
			console.log(keyword);
			console.log(listArry[0].indexOf('苹'));

			//搜索判断
			for (var i in listArry) {
				if ((keyword == listArry[i]) || (listArry[i].indexOf(keyword) >= 0)) {
					bol = true;
					break;
				}
			}
			if (bol) {

				for (var i in pageId) {
					mui.fire(plus.webview.getWebviewById(pageId[i]), eventId, {
						data: keyword
					});
				}
				mui.openWindow({
					id: pageId[0]
				});
			} else {
				mui.toast("没有查找到相关商品");
			}

		}
	}
	self.openPage = function(searchId,keyword) {
		var pageId = searchClassification[searchId].pageId;
		var eventId = searchClassification[searchId].eventId;

		for (var i in pageId) {
			mui.fire(plus.webview.getWebviewById(pageId[i]), eventId, {
				data: keyword
			});
		}
		mui.openWindow({
			id: pageId[0]
		});
	}
	//打开和关闭弹出面板
	document.getElementById("select").addEventListener('tap', function() {
		mui('#popover').popover('toggle');
	});

	//弹出类型选择面板,获取选中项的内容和id
	$('#popover ul').on('tap', 'li', function() {
		vm.type = this.innerText;
		console.log(this.innerText);
		mui('#popover').popover('hide');
		vm.searchId = this.getAttribute('id');
		vm.history = searchClassification[vm.searchId].searchHistory;
		console.log(vm.searchId);
		console.log(searchClassification[vm.searchId].id);
	});
	//输入框事件
	document.getElementById("input").addEventListener('keypress', function(event) {
		self.search(searchClassification[vm.searchId], this.value, event.keyCode);
	});

	//点击搜索历史事件
	mui('#showSearchHistory').on('tap', 'li', function() {
		console.log("打开"+this.innerText);
		//1、获得当前的searchId，判断出是哪一个的搜索历史展示
		//2、根据searchId的不同，来进行不同的跳转
		self.search(searchClassification[vm.searchId],this.innerText,13);

	});
	//点击搜索按钮进行搜索
	document.getElementById("searchBtn").addEventListener('tap', function() {
		var keyword = document.getElementById("input").value;
		console.log(keyword);
		self.search(searchClassification[vm.searchId],keyword, 13);
	});
	/**
	 * 清除历史记录.清空容器
	 */
	document.getElementById("clearHistory").addEventListener('tap', function() {
		searchClassification[vm.searchId].searchHistory = [];
		vm.history = searchClassification[vm.searchId].searchHistory;
	});

	var Vue = require('../js/vue.js');
	var vm = new Vue({
		el: '#search',
		data: {
			type: '商品',
			history: searchClassification[0].searchHistory,
			searchId: '0'
		}
	});

});