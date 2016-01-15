define(function(require, exports, module) {
	mui.init({
		preloadPages: [{
			url: 'details.html',
			id: 'details.html'
		}],
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	var self = exports;
	var Vue = require('../js/vue.js');
	var testData = [];
	var parentPage = null;
	//测试用的数据，实际可以通过ajax从后台获取
	testData = [{
		id: 1,
		name: "1",
		price: 13, //价格
		sales: 100, //销量
		minAmount: 500, //起送量
		distance: '配送范围内', //距离
		sellerPos: '北京'
	}, {
		id: 2,
		name: "2",
		price: 12,
		sales: 80,
		minAmount: 1500, //起送量
		distance: '超出配送范围', //距离
		sellerPos: '上海'
	}, {
		id: 3,
		name: "3",
		price: 14,
		sales: 60,
		minAmount: 5000, //起送量
		distance: '可送达最近社区', //距离
		sellerPos: '广州'
	}, {
		id: 4,
		name: "4",
		price: 9,
		sales: 20,
		minAmount: 50, //起送量
		distance: '配送范围内', //距离4
		sellerPos: '菏泽'
	}, {
		id: 5,
		name: "5",
		price: 1,
		sales: 50,
		minAmount: 1500, //起送量
		distance: '超出配送范围', //距离2
		sellerPos: '上海'
	}, {
		id: 6,
		name: "6",
		price: 23,
		sales: 50,
		minAmount: 500, //起送量
		distance: '超出配送范围', //距离4
		sellerPos: '济南'
	}, {
		id: 7,
		name: "7",
		price: 100,
		sales: 5,
		minAmount: 50, //起送量
		distance: '配送范围内', //距离2
		sellerPos: '上海'
	}, {
		id: 8,
		name: "8",
		price: 11,
		sales: 502,
		minAmount: 500, //起送量
		distance: '可送达最近社区', //距离
		sellerPos: '北京'
	}, {
		id: 9,
		name: "9",
		price: 1,
		sales: 50,
		minAmount: 12500, //起送量
		distance: '可送达最近社区', //距离2
		sellerPos: '上海'
	}, {
		id: 10,
		name: "10",
		price: 1,
		sales: 50,
		minAmount: 3500, //起送量
		distance: '配送范围内', //距离2
		sellerPos: '北京'
	}, {
		id: 11,
		name: "11",
		price: 1,
		sales: 50,
		minAmount: 23500, //起送量
		distance: '配送范围内', //距离2
		sellerPos: '青岛'
	}];

	var vm = new Vue({
		el: '#sort',
		data: {
			items: testData,
			desc: -1,
			type: 'sales'
		}
	});
	window.addEventListener('noticeFromParent', function(e) {
		var data = e.detail.data;
		console.log(JSON.stringify(e.detail.data));
		vm.desc = data.desc;
		vm.type = data.name;
		console.log(vm.desc);
	});


	mui.plusReady(function() {
		parentPage = plus.webview.getWebviewById('product-list.html');
		$('#list').on('tap', 'li', function() {
			mui.fire(plus.webview.getWebviewById('details.html'), 'productName:sort.html', {
				data: $(this).attr('id')
			});
			mui.openWindow({
				id: 'details.html'
			});
		});
	});

	/**
	 *	接收和筛选 
	 */
	window.addEventListener('filterFromMenu', function(e) {
		//通知product-list页面关闭弹出菜单
		mui.fire(parentPage, 'fromSort', {
			data: ''
		});

		var filterData = e.detail.data;
		console.log(JSON.stringify(filterData));
		var bol = {
			byPos: true,
			byDistance: true,
			byAmount: true,
			byPrice: true
		};
		console.log(filterData.sellerPos + "***" + filterData.distance + '***' + filterData.amount.min + '***' + filterData.amount.max + "********" + filterData.minPrice + '***' + filterData.maxPrice);
		vm.items = testData.filter(function(item) {
			//发货地筛选
			if (filterData.sellerPos != "不限") {
				if (filterData.sellerPos == item.sellerPos) {
					bol.sellerPos = true;
				} else {
					bol.sellerPos = false;
				}
			} else {
				bol.sellerPos = true;
			}
			//配送范围筛选
			if (filterData.distance != "不限") {
				if (filterData.distance == item.distance) {
					bol.distance = true;
				} else {
					bol.distance = false;
				}
			} else {
				bol.distance = true;
			}
			//起送量筛选
			if (filterData.deliveryCapacity != "不限") {
				if ((item.minAmount >= filterData.amount.min) && (item.minAmount <= filterData.amount.max)) {
					bol.byAmount = true;
				} else {
					bol.byAmount = false;
				}
			} else {
				bol.byAmount = true;
			}
			//价格筛选
			if ((item.price >= filterData.minPrice) && (item.price <= filterData.maxPrice)) {
				bol.byPrice = true;
			} else {
				bol.byPrice = false;
			}
			console.log(bol.sellerPos + "位置" + bol.distance + '距离' + bol.byAmount + "数量" + bol.byPrice + "价格");
			return bol.sellerPos && bol.distance && bol.byAmount && bol.byPrice;
		});
	});


	function pulldownRefresh() {
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
	}


});