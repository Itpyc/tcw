define(function(require, exports, module) {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	//预加载页面
	/*var detalisPage = mui.preload({
		url: 'details.html',
		id: 'details'
	});*/

	mui.plusReady(function(){
		/*console.log(plus.webview.getWebviewById('product-list.html'));*/
		vm.productName = plus.storage.getItem("productName");	
		console.log(vm.productName);
	});
	//监听事件，接受来自于product-list的传值
	window.addEventListener('product', function(event) {
		vm.productName = event.detail.title;
		console.log(event.detail.title);
	});
	window.addEventListener('getCity',function(event){
		console.log(event.detail.city);
		vm.sellerPos = event.detail.city;
	})
	var self = exports;
	//排序
	self.sortByType = function(array, type, sortType) {
		array.sort(function(a, b) {
			var result = null;
			switch (type) {
				case 'price':
					result = (sortType == "desc") ? (a.price - b.price) : (b.price - a.price);
					break;
				case 'sales':
					result = sortType == "desc" ? (a.sales - b.sales) : (b.sales - a.sales);
					break;
				case 'comprehensive':
					result = sortType == "desc" ? (a.comprehensive - b.comprehensive) : (b.comprehensive - a.comprehensive);
					break;
				default:
					break;
			}
			return result;
		});
		return array;
	};
	
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
		mui.back = function(){
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
	 * mask 是一个数组
	 */
	mask[0].addEventListener('tap', function() {
		self.hide();
	}, false);

	var Vue = require('../js/vue.js');
	var data = [{
		id: 1,
		name: "1",
		price: 13,
		sales: 100,
		comprehensive: 3
	}, {
		id: 2,
		name: "2",
		price: 12,
		sales: 80,
		comprehensive: 5
	}, {
		id: 3,
		name: "3",
		price: 14,
		sales: 60,
		comprehensive: 5
	}, {
		id: 4,
		name: "4",
		price: 9,
		sales: 20,
		comprehensive: 4
	}, {
		id: 5,
		name: "5",
		price: 1,
		sales: 50,
		comprehensive: 2
	}, {
		id: 6,
		name: "6",
		price: 23,
		sales: 50,
		comprehensive: 4
	}, {
		id: 7,
		name: "7",
		price: 100,
		sales: 5,
		comprehensive: 2
	}, {
		id: 8,
		name: "8",
		price: 11,
		sales: 502,
		comprehensive: 5
	}, {
		id: 9,
		name: "9",
		price: 1,
		sales: 50,
		comprehensive: 2
	}, {
		id: 10,
		name: "10",
		price: 1,
		sales: 50,
		comprehensive: 2
	}, {
		id: 11,
		name: "11",
		price: 1,
		sales: 50,
		comprehensive: 2
	}];

	for (var i = 0; i < data.length; i++) {
		console.log(self.sortByType(data, "price")[i].price);
	}
	//定义初始状态，即默认状态
	var target = document.getElementById("comprehensive");
	var sortType = "desc";
	//自定义指令要放置在Vue实例之后,自定义排序指令
	Vue.directive('sort',
		function(value) {
			this.el.addEventListener('tap', function() {
				//点击时更改字体颜色
				target.style.color = null;
				target = this;
				this.style.color = 'blue';
				//点击时更改排序方式
				sortType = sortType == "desc" ? "asce" : "desc"
					//价格排序时，更改箭头指向
				if (value == "price") {
					vm.arrow = vm.arrow == 'desc' ? 'up' : 'desc';
				}

				if (value != "filter") {
					//生成数据
					vm.items = self.sortByType(data, value, sortType);
					/*document.getElementById("filter").classList.add('active');
					console.log(value);*/
				}

			});
		}
	);
	//自定义跳转指令
	
	mui.preload({
		url:'details.html',
		id:'details.html'
	})
	
	Vue.directive('details', function(value) {
		console.log(value);
		this.el.addEventListener('tap', function() {
			/*console.log(value);
			console.log(detalisPage);*/
			//传值，通过自定义事件的方式.将商品的ID传给详情页
			/*mui.fire(detalisPage, 'details', {
				id: value
			});*/
			//打开详情页面
			mui.openWindow({
				url:'details.html',
				id: 'details',
				extras:{
					data:vm.productName
				}
			});
		});
	});
	
	var target1 = document.querySelector('.amount-active');
	//改变颜色
	Vue.directive('change',function(value){
		this.el.addEventListener('tap',function(){
			console.log(value);
			vm.amount=this.innerText;
			if(this != target1){
				target1.classList.remove('amount-active');
				this.classList.add('amount-active');
			}
			target1 = this;
		});
	});
	
	var vm = new Vue({
		el: '#sort',
		data: {
			items: self.sortByType(data, "comprehensive", "desc"),
			productName:' ',
			arrow: 'desc',
			sellerPos:'选择发货地',
			amount:'不限',
			minPrice:'',
			maxPrice:''
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
	
	document.getElementById("button").addEventListener('tap',function(){
		alert("价格:"+vm.minPrice+"-"+vm.maxPrice+"---"+"发货地方:"+vm.sellerPos+"---"+"起送量:"+vm.amount);
	});
	
	document.getElementById("location").addEventListener('tap',function(){
		mui.openWindow({
			url:'city.html',
			id:'city'
		});
	});
	function pullupRefresh() {
		/*vm.items = ['苹果', '梨子', '香蕉', '西瓜'];*/
		mui('#pullrefresh').pullRefresh().endPullupToRefresh();

	}


















});