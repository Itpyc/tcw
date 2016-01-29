define(function(require, exports, module) {
	mui.init({
		preloadPages: [{
			url: 'details.html',
			id: 'details.html'
		}],
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});

	//自定义跳转指令
	//预加载商品详情界面
	//进入商品详情界面
	mui.plusReady(function() {
		$('#list').on('tap', 'li', function() {
			mui.fire(plus.webview.getWebviewById('details.html'), 'productName:sort.html', {
				data: $(this).attr('id')
			});
			mui.openWindow({
				id: 'details.html'
			});
		});
	});

	//监听事件，接受来自于product-list的传值,获取到商品的名字
	window.addEventListener('productName', function(event) {
		vm.productName = event.detail.data;
		console.log(event.detail.data);
	});

	var self = exports;
	/**
	 * 排序函数
	 * @param {Object} array 要排序的数组
	 * @param {Object} type	 按照哪个属性进行排序
	 * @param {Object} sortType 排序的方式，即升序还是降序
	 */
	/*self.sortByType = function(array, type, sortType) {
		array.sort(function(a, b) {
			var result = null;
			switch (type) {
				case 'price':
					result = (sortType == "desc") ? (a.price - b.price) : (b.price - a.price);
					break;
				case 'sales':
					result = sortType == "desc" ? (a.sales - b.sales) : (b.sales - a.sales);
					break;
				case 'distance':
					result = sortType == "desc" ? (a.distance - b.distance) : (b.distance - a.distance);
					break;
				case 'min_amount':
					result = sortType == "desc" ? (a.min_amount - b.min_amount) : (b.min_amount - a.min_amount);
					break;
				default:
					break;
			}
			return result;
		});
		return array;
	};*/
	//筛选面板
	var filter = document.getElementById("filter");
	var mask = mui.createMask();
	/**
	 *筛选面板 
	 */
	//显示面板
	self.show = function() {
			mask.show();
			filter.classList.add('active');
			self._back = mui.back;
			mui.back = function() {
				self.hide();
			}
		}
		//隐藏面板
	self.hide = function() {
			mask.close();
			filter.classList.remove('active');
			mui.back = self._back;
		}
		/**
		 * mask 是一个数组，点击遮罩时隐藏筛选面板
		 */
	mask[0].addEventListener('tap', function() {
		self.hide();
	}, false);

	var Vue = require('../js/vue.js');
	var data = [];
	//测试用的数据，实际可以通过ajax从后台获取
	data = [{
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



	/*for (var i = 0; i < data.length; i++) {
		console.log(self.sortByType(data, "price")[i].price);
	}*/
	//定义初始状态，即默认状态
	var target = document.getElementById("distance");
	var sortType = "desc";
	//自定义指令要放置在Vue实例之后,自定义排序指令
	//自定义排序指令
	Vue.directive('sort',
		function(value) {
			this.el.addEventListener('tap', function() {
				//点击时更改字体颜色
				target.style.color = null;
				target = this;
				this.style.color = 'blue';
				if (value != "filter") {
					vm.sortBy = value;
				}
				if (value == "price") {
					vm.arrow = vm.arrow == 'desc' ? 'up' : 'desc';
					vm.desc = 0 - vm.desc;
				}

				/*//点击时更改排序方式
				sortType = sortType == "desc" ? "asce" : "desc"
					//价格排序时，更改箭头指向
				if (value == "price") {
					vm.arrow = vm.arrow == 'desc' ? 'up' : 'desc';
				}
				if (value != "filter") {
					//生成数据
					vm.items = self.sortByType(data, value, sortType);
				}*/

			});
		}
	);
	var target1 = document.querySelector('.amount-active');
	//改变颜色
	Vue.directive('change', function(value) {
		this.el.addEventListener('tap', function() {
			console.log(this.parentElement.id);
			if (this.parentElement.id == "distance") {
				vm.distance = this.innerText;
			}
			if (this.parentElement.id == "amount") {
				vm.deliveryCapacity = this.innerText;
				vm.amount = value;
			}

			if (this != target1) {
				target1.classList.remove('amount-active');
				this.classList.add('amount-active');
			}
			target1 = this;
		});
	});

	/*//获取价格区间
	document.getElementById("minPrice").addEventListener('change', function() {
		vm.minPrice = this.value;
		console.log(this.value);
	});
	document.getElementById("maxPrice").addEventListener('change', function() {
		vm.maxPrice = this.value;
		console.log(this.value);
	});*/


	//过滤指令
	/*	Vue.directive('filter', {
			bind: function() {
			this.el.addEventListener('tap',function(){
					console.log('ID那级');
				});
				
			},
			update: function(value) {

			}
		});*/
	//实例

	var vm = new Vue({
		el: '#sort',
		data: {
			items: data,
			productName: '',
			arrow: 'desc',
			sellerPos: '不限',
			amount: {
				min: 0,
				max: 9999999999999999999999
			},
			deliveryCapacity: '',
			distance: '不限',
			minPrice: 0,
			maxPrice: 9990,
			sortBy: 'sales',
			desc: 1,
			showClass: true
		},
		methods: {
			show: function(event) {
				self.show();
			},
			hide: function(event) {
				self.hide();
			}
		}
	});
	//过滤功能
	var filterData = data;
	//监视起送量的变化，变化了则进行数据更新
	/*vm.$watch('deliveryCapacity', function(newVal, oldVal) {
		var bol = false;
		filterData = data;
		filterData = data.filter(function(item) {
			switch (newVal) {
				case 0:
					bol = true;
					break;
				case 1:
					if ((item.minAmount >= 0) && (item.minAmount <= 1000)) {
						bol = true;
					} else {
						bol = false;
					}
					break;
				case 2:
					console.log((item.minAmount >= 1001) && (item.minAmount <= 5000));
					if ((item.minAmount >= 1001) && (item.minAmount <= 5000)) {
						bol = true;
					} else {
						bol = false;
					}
					break;
				case 3:
					if ((item.minAmount >= 5001)) {
						bol = true;
					} else {
						bol = false;
					}
					break;
				default:
					break;
			}
			console.log(bol);
			return bol;
		});

	});*/

	//获取到用户筛选的城市信息
	window.addEventListener('getCity', function(event) {
		console.log(event.detail.city);
		vm.sellerPos = event.detail.city;
		console.log(vm.sellerPos);

	});
	window.addEventListener('dataChange',function(e){
		vm.desc = data.desc;
		vm.sortBy = data.sortBy;
		self.show();
		
		console.log(JSON.stringify(e.detail.data))
	});

	//监测价格的变化
	/*var filterByPos = filterData;
	vm.$watch('sellerPos', function(newVal, oldVal) {
		console.log(newVal);
		filterByPos = filterData;
		filterByPos = filterData.filter(function(item) {
			console.log(item.city == newVal);
			return item.city == newVal;
		});
	});*/

	//开始进行筛选
	document.getElementById("button").addEventListener('tap', function() {
		var bol = {
			byPos: true,
			byDistance: true,
			byAmount: true,
			byPrice: true
		};
		console.log(vm.sellerPos + "***" + vm.distance + '***' + vm.amount.min + '***' + vm.minPrice + '***' + vm.maxPrice);
		vm.items = data.filter(function(item) {
			//发货地筛选
			if (vm.sellerPos != "不限") {
				if (vm.sellerPos == item.sellerPos) {
					bol.sellerPos = true;
				} else {
					bol.sellerPos = false;
				}
			} else {
				bol.sellerPos = true;
			}

			//配送范围筛选

			if (vm.distance != "不限") {
				if (vm.distance == item.distance) {
					bol.distance = true;
				} else {
					bol.distance = false;
				}
			} else {
				bol.distance = true;
			}
			//起送量筛选
			if (vm.deliveryCapacity != "不限") {
				if ((item.minAmount >= vm.amount.min) && (item.minAmount <= vm.amount.max)) {
					bol.byAmount = true;
				} else {
					bol.byAmount = false;
				}
			} else {
				bol.byAmount = true;
			}

			//价格筛选
			console.log((item.price >= vm.minPrice) && (item.price <= vm.maxPrice))
			if ((item.price >= vm.minPrice) && (item.price <= vm.maxPrice)) {
				bol.byPrice = true;
			} else {
				bol.byPrice = false;
			}

			return bol.sellerPos && bol.distance && bol.byAmount && bol.byPrice;
		});
	});

	/*document.getElementById("location").addEventListener('tap', function() {
		mui.openWindow({
			url: 'city.html',
			id: 'city'
		});
	});*/

	function pullupRefresh() {
		/*vm.items = ['苹果', '梨子', '香蕉', '西瓜'];*/
		mui('#pullrefresh').pullRefresh().endPullupToRefresh();

	}
});