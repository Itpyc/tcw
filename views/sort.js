define(function(require, exports, module) {
	mui.init({
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
	mui.plusReady(function() {
		parentPage = plus.webview.getWebviewById('product-list.html');
		detailPage = mui.preload({
			url: 'details.html',
			id: 'details.html'
		});
	});
	
	/*mui.plusReady(function(){
		
	});*/
	
	//接收来自于shop的数据
	window.addEventListener('productName', function(e) {
		console.log(e.detail.data);
		vm.name = e.detail.data;
	});

	/*window.addEventListener('productInfoFromProductList',function(e){
		console.log(e.detail.data);
		vm.name = e.detail.data;
	});*/
	var self = exports;
	var Vue = require('../js/vue.js');
	
	//从后台获取商品列表，仅获取简单商品信息列表信息
	//如果用户点击排序，是重新从后台获取排序之后的，还是将现有的进行排序
	/*mui.ajax('',{
		
	});*/
	
	
	
	var testData = [];

	//测试用的数据，实际可以通过ajax从后台获取
	testData = [{
		shopId:'shop01',
		id: 1,
		name: "1",
		price: 13, //价格
		sales: 100, //销量
		minAmount: 500, //起送量
		distance: '配送范围内', //距离
		sellerPos: '北京'
	}, {
		shopId:'shop02',
		id: 2,
		name: "2",
		price: 12,
		sales: 80,
		minAmount: 1500, //起送量
		distance: '超出配送范围', //距离
		sellerPos: '上海'
	}, {
		shopId:'shop03',
		id: 3,
		name: "3",
		price: 14,
		sales: 60,
		minAmount: 5000, //起送量
		distance: '可送达最近社区', //距离
		sellerPos: '广州'
	}, {
		shopId:'shop04',
		id: 4,
		name: "4",
		price: 9,
		sales: 20,
		minAmount: 50, //起送量
		distance: '配送范围内', //距离4
		sellerPos: '菏泽'
	}, {
		shopId:'shop05',
		id: 5,
		name: "5",
		price: 1,
		sales: 50,
		minAmount: 1500, //起送量
		distance: '超出配送范围', //距离2
		sellerPos: '上海'
	}, {
		shopId:'shop06',
		id: 6,
		name: "6",
		price: 23,
		sales: 50,
		minAmount: 500, //起送量
		distance: '超出配送范围', //距离4
		sellerPos: '济南'
	}, {
		shopId: 'shop07',
		id: 7,
		name: "7",
		price: 100,
		sales: 5,
		minAmount: 50, //起送量
		distance: '配送范围内', //距离2
		sellerPos: '上海'
	}, {
		shopId: 'shop08',
		id: 8,
		name: "8",
		price: 11,
		sales: 502,
		minAmount: 500, //起送量
		distance: '可送达最近社区', //距离
		sellerPos: '北京'
	}, {
		shopId: 'shop09',
		id: 9,
		name: "9",
		price: 1,
		sales: 50,
		minAmount: 12500, //起送量
		distance: '可送达最近社区', //距离2
		sellerPos: '上海'
	}, {
		shopId: 'shop10',
		id: 10,
		name: "10",
		price: 1,
		sales: 50,
		minAmount: 3500, //起送量
		distance: '配送范围内', //距离2
		sellerPos: '北京'
	}, {
		shopId: 'shop11',
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
			name: '',
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


	var parentPage = null;
	var detailPage = null;
	
	//当用户点击某个商品时，跳转到详情页面，将该商品的id传过去，并通知后台提取该商品的详细信息
	$('#list').on('tap', 'li', function() {
		mui.fire(detailPage, 'productName:sort.html', {
			data: $(this).attr('id')
		});
		mui.openWindow({
			id: 'details.html'
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
		
		//将filterData发送向后台，让后台进行筛选，然后返回筛选后的数据
		
		//将筛选后的结果放入展示列表中去
		
		
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
		//此处添加一个向服务器获取数据的方法，并且将获取到的数组unshift进展示列表中
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		
		//此处添加一个向服务器获取数据的方法，并且将获取到的数组push进展示列表中
		
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
	}


});