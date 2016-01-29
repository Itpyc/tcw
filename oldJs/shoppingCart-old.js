define(function(require, exports, module) {
	var Vue = require('../js/vue.js');
	var detailsPage = null;
	mui.init();
	mui.plusReady(function() {
		detailsPage = plus.webview.getWebviewById('details.html');
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005

		});
	});
	var k = 0;
	var product = [];
	var name = '';

	window.addEventListener('add', function(e) {
		var bol = true;
		var options = e.detail.data;

		/*console.log("接收到的数据为" + JSON.stringify(options));*/

		var indexArr = []; //存放下标
		var arr = []; //存放最后的数组
		var arrEl = {
			shopId: '',
			products: [{}]
		}; //临时对象，用来合并shopId相同的数据
		var alike = []; //存放shopId相同的个数
		var arrSort = []; //存放排列好的数组，即将shopId相同的放在一起
		//排序
		for (var i = 0; i < options.length; i++) {
			var n = []; //临时数组，存放
			if (JSON.stringify(indexArr).indexOf(i.toString()) != -1) {
				console.log('已经存在了');
				continue;
			}
			arrEl.shopId = options[i].shopId;
			for (var j = i; j < options.length; j++) {
				if (options[i].shopId == options[j].shopId) {
					n.push(j);
					arrEl.products.push(options[j].productsInfo);
				}
			}
			for (var i in n) {
				indexArr.push(n[i]);
			}
			alike.push(n.length);
			arr.push(arrEl);
			arrEl = {
				shopId: '',
				products: [{}]
			}
		}
		/*console.log(JSON.stringify(indexArr))
		console.log(JSON.stringify(alike));
		console.log(JSON.stringify(arr));*/
		vm.list = arr;
		for (var i in vm.list) {
			if (JSON.stringify(vm.list[i].products[0]) == '{}') {
				vm.list[i].products.shift();
				/*console.log(JSON.stringify(vm.list[i]))*/
			}
		}


		/*var arr = [];
		var arrEl = {
			shopId: '',
			products: [{}]
		}
		var t = 0;
		var k = 0;
		console.log("接收道德数据:" + JSON.stringify(options));
		for (var i = 0; i < options.length; i++) {
			for (var j = i; j < options.length; j++) {
				console.log(JSON.stringify(options[i].shopId));
				if (options[i].shopId == options[j].shopId) {
					console.log(k);
					console.log('找到一样的了');
					bol = true;
					t = t + 1;
					arrEl.shopId = options[i].shopId;
					console.log(options[i].shopId)
					arrEl.products.push(options[j].productsInfo);
					options = options.splice(j, 1);
					alert(JSON.stringify(options));
				}
			}
			if (t <= options.length) {
				k = k + 1;
				arr.push(arrEl);
				arrEl = {
					shopId: '',
					products: [{}]
				}
			}
		}
		console.log(JSON.stringify(arr))*/






		/*		var bol = true;
				var options = e.detail.data;
				console.log(options);
				console.log(options.name);
				console.log(options.num);
				console.log(JSON.stringify(options));
				for (var i = 0; i < arr.length; i++) {
					console.log(JSON.stringify(arr[i]));
					//如果再arr数组中已经保存了该商店的商品，则直接在其下面加载商品
					if (arr[i].shopId == options.name) {
						bol = false;;
						console.log('找到组织了' + options.name);
						arr[i].products.push({
							id: options.pay,
							content: options.send
						});
						return;
					} else {
						bol = true;
					}
				}
				if (bol) {
					product.push({
						id: options.pay,
						content: options.send
					});
					arr.push({
						shopId: options.name,
						products: product
					});
				}
				if (arr[0].shopId == '') {
					arr.splice(0, 1);
				}
				vm.list = arr;
				product = [];
				console.log(JSON.stringify(vm.list))*/

		/*console.log('dd');
		
		name = options.name;
		for (var i in options.num) {
			products.push({
				id: options.pay,
				content: options.send
			});
		};
		console.log(JSON.stringify({
			shopId: options.name,
			products: products
		}));
		
		k = k + 1;
		console.log(JSON.stringify(vm.list))*/
	});

	/*var bol = true;
	document.getElementById("all").addEventListener('change', function() {
		if (bol) {
			mui('input[type="checkbox"]').each(function(index) {
				console.log(index + ':' + this.checked)
				this.checked = true;
			});
			bol = false;
		} else {
			mui('input[type="checkbox"]').each(function(index) {
				console.log(index + ':' + this.checked)
				this.checked = false;
			});
			bol = true;
		}
	});*/
	/*	$('ul').on('tap', 'li:not(.first)', function() {
			console.log('dd');
			console.log($(this).attr('id'));
			mui.openWindow({
				url:'details.html',
				id:'details.html',
				extras:{
					data:$(this).attr('id')
				}
			});
		});*/

	/*$('li').on('tap',function(){
		console.log('aaaa');
	});*/

	/*var testData0 = [{
		"shopId": "shop08",
		"name": "橘子",
		"num": "1",
		"pay": "支付宝",
		"send": "送货上门（加付4元）"
	}, {
		"shopId": "shop08",
		"name": "橘子",
		"num": "1",
		"pay": "微信支付",
		"send": "送货上门（加付4元）"
	}, {
		"shopId": "shop01",
		"name": "橘子",
		"num": "1",
		"pay": "微信支付",
		"send": "送货上门（加付4元）"
	}, {
		"shopId": "shop08",
		"name": "橘子",
		"num": "1",
		"pay": "微信支付",
		"send": "送货上门（加付4元）"
	}, {
		"shopId": "shop01",
		"name": "橘子",
		"num": "1",
		"pay": "微信支付",
		"send": "送货上门（加付4元）"
	}]


	var testData = [{
		shopId: '通村网1',
		products: [{
			id: '通村网1-1',
			content: '苹果'
		}, {
			id: '通村网1-2',
			content: '香蕉'
		}]
	}, {
		shopId: '通村网1',
		products: [{
			id: '通村网2-1',
			content: '苹果'
		}, {
			id: '通村网2-2',
			content: '香蕉'
		}]
	}, {
		shopId: '通村网3',
		products: [{
			id: '通村网3-1',
			content: '苹果'
		}, {
			id: '通村网3-2',
			content: '香蕉'
		}]
	}]*/
	var bol = true;
	//全选和全不选功能
	Vue.directive('first', {
		update: function(value) {
			console.log(mui('#' + value + ' input[type=checkbox]'));
			// 值更新时的工作
			// 也会以初始值为参数调用一次
			console.log(value);
			console.log(this.el);
			this.el.addEventListener('change', function() {
				console.log('tap');
				if (bol) {
					console.log(bol);
					mui('#' + value + ' input[type=checkbox]').each(function(index) {
						console.log(index);
						console.log(this.checked);
						this.checked = true;
						vm.productNumber++;
						bol = false;
					});
				} else {
					mui('#' + value + ' input[type=checkbox]').each(function(index) {
						console.log(index);
						console.log(this.checked);
						this.checked = false;
						vm.productNumber--;
						bol = true;
					});
				}
			});
		}
	});

	Vue.directive('go-details', function(value) {
		console.log(value);
		this.el.addEventListener('tap', function() {
			console.log('aaaaaaaaaaaaa');
			mui.fire(detailsPage, 'productName:shoppingCart.html', {
				data: value
			});
			mui.openWindow({
				id: 'details.html'
			});

		});
	});
	var isChecked = 1;
	var vm = new Vue({
		el: '#cart',
		data: {
			list: [],
			productNumber: 0
		},
		methods: {
			show: function(event) {
				console.log(event.target.checked);
				if (event.target.id == 'all') {
					this.productNumber = 0;
					var checkNum = 0;
					console.log('选中了所有的');
					if (event.target.checked) {
						mui('.first').each(function(index) {
							this.checked = true;
						});
						mui('input[type=checkbox]:not(.first)').each(function(index) {
							this.checked = true;
							checkNum += 1;
						});
					} else {
						mui('.first').each(function(index) {
							this.checked = false;
						});
						mui('input[type=checkbox]:not(.first)').each(function(index) {
							this.checked = false;
						});
						checkNum = 1;
					}
					this.productNumber = checkNum - 1;
				} else {

					if (event.target.checked) {
						this.productNumber += 1;
					} else {
						this.productNumber -= 1;
					}
				}



				/*console.log('dddddagfaa');
				console.log(isChecked);
				console.log(this.productNumber);
				if (isChecked == 1) {
					this.productNumber++;

				} else {
					if (this.productNumber > 0) {
						this.productNumber--;
					} else {
						this.productNumber = 0;
					}

				}

				isChecked = 0 - isChecked;*/
			}
		}
	});
	/*mui('li').on('tap', 'input', function() {
		alert('dd');
	});*/
	/*mui('li').on('change','input',function(e){
		alert(e);
		console.log(this.checked);
		console.log(e);
	});*/
	/*$('li').on('tap','input',function(){
		alert('dd');
		console.log(this.checked);
	});*/
	console.log(JSON.stringify(vm.list))

});