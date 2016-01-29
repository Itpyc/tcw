/**
 * 该页面主要是对商品的查看，增删改结算等
 */
define(function(require, exports, module) {
	var Vue = require('../js/vue.js');
	var detailsPage = null;
	var accountsPage = null;
	var detailProduct = null;
	mui.init();
	mui.plusReady(function() {
		accountsPage = plus.webview.getWebviewById('order.html');
		detailsPage = plus.webview.getWebviewById('details.html');
		detailProduct = plus.webview.getWebviewById('details-product.html');
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005
		});
	});
	var k = 0;
	var product = [];
	var name = '';
	var options = [];
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
		shopId: '通村网2',
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
	}]

	var temp = [];
	window.addEventListener('add', function(e) {
		options = e.detail.data;
		console.log(JSON.stringify(temp))
			/*options.push(temp);*/
		console.log("接收到的数据为" + JSON.stringify(options));
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

		temp = [];
	});
	var bol = true;
	var selectNum = 0;
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
				$(this).toggleClass('isChecked');
				var first = $(this);
				var id = $(this).attr('tags');
				console.log(id);
				$('.' + id).each(function(index) {
					console.log('ddd');
					$(this).toggleClass('isChecked');
					if (first.hasClass('isChecked')) {
						this.checked = true;
					} else {
						this.checked = false;
					}
				});

				/*if (bol) {
					console.log(bol);
					mui('#' + value + ' input[type=checkbox]').each(function(index) {
						console.log(index);
						console.log(this.checked);
						this.checked = true;
							vm.productNumber ++;
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
				}*/


			});
			$('li').each(function(index) {
				console.log($(this).find('input:not(.first)').hasClass('isChecked'))
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

	Vue.directive('accounts', function(value) {
		console.log(value);
		console.log($(this).children('input[type=checkbox]').attr('checked') == true)
	});
	var isChecked = 1;
	var vm = new Vue({
		el: '#cart',
		data: {
			list: [],
			testList: testData,
			productNumber: 0,
			accountsList: []
		},
		methods: {
			show: function(event) {
				
				
				/*console.log(event.target.checked);
				
				$(event.target).toggleClass('isChecked');*/
				
				
				
				
				/*if (event.target.id == 'all') {
					console.log('选中了所有的');
					if (event.target.checked) {
						mui('input[type=checkbox]:not(.first)').each(function(index) {
							this.checked = true;
							$(this).addClass('isChecked');
						});
					} else {
						mui('.first').each(function(index) {
							this.checked = false;
						});
						mui('input[type=checkbox]:not(.first)').each(function(index) {
							this.checked = false;
							$(this).removeClass('isChecked');
						});
					}
				} */
			}
			
			
			
			
		}
	});



	//点击结算按钮
	document.getElementById("balanceAccount").addEventListener('tap', function() {
		var accountsObj = {
			shopId: '',
			accounts: [{

			}]
		};
		var accountsArr = [];
		$('li').each(function(index) {
			console.log($(this).find('input:not(.first)').hasClass('isChecked'));
			if ($(this).find('input:not(.first)').hasClass('isChecked')) {
				console.log('选中的是商品' + $(this).attr('id'));
				var id = $(this).attr('id');
				var shopId = id.split(',')[1];
				var productId = id.split(',')[0];
				console.log(shopId);
				for (var i = 0; i < vm.list.length; i++) {
					if (shopId == vm.list[i].shopId) {
						console.log('pppp');
						accountsObj.shopId = shopId;
						console.log(JSON.stringify(vm.list[i].products));
						for (var j = 0; j < vm.list[i].products.length; j++) {
							console.log(vm.list[i].products[j].id);
							if (id == vm.list[i].products[j].id) {
								console.log('zhaogaol');
								accountsObj.accounts.push(vm.list[i].products[j]);
								console.log(JSON.stringify(accountsObj));
								break;
							}
						}
					}

				}
				accountsArr.push(accountsObj);
				console.log(JSON.stringify(accountsArr));
				accountsObj = {
					shopId: '',
					accounts: [{}]
				}
			}
		});

		if (accountsArr.length > 0) {

			for (var i in accountsArr) {
				if (JSON.stringify(accountsArr[i].accounts[0]) == '{}') {
					accountsArr[i].accounts.shift();
					console.log(JSON.stringify(accountsArr[i]))
				}
			}

			mui.fire(accountsPage, 'accountsFromShoopingCart', {
				data: accountsArr
			});

			mui('input').each(function(index) {
				this.checked = false;
			});
			mui.openWindow({
				id: 'order.html'
			});
		} else {
			mui.toast('未选择商品');
		}
	});

	
	$('li').on('change','input',function(e){
		var selectNum = 0; 
		if($(this).hasClass('isChecked')&&$(this).hasClass('first')){
			console.log('dddddafasfafasdfasfdas');
		}
		
		
		
		
		
		$('li input[type=checkbox]:not(.first)').each(function(){
			if($(this).hasClass('isChecked')){
				selectNum += 1;
			}
		});
		vm.productNumber = selectNum;
		console.log(vm.productNumber);
		
	});

	document.getElementById("edit").addEventListener('tap', function() {
		$('nav').toggleClass('mui-hidden');
	});
	/*$('.mui-delete').on('tap',function(){
		console.log('dddddd');
		alert('aacdaf');
		var deleteId = $(this).parent('li').attr('id');
		console.log($(this).parent('li').attr('id'));
		
	});*/
	document.getElementById("delete").addEventListener('tap', function() {
		var deleteArr = [];
		$('li').each(function(index) {
			console.log($(this).find('input:not(.first)').hasClass('isChecked'));
			if ($(this).find('input').hasClass('isChecked')) {
				console.log('删除');
				deleteArr.push($(this).attr('id'));
				/*console.log($(this).attr('id'));
				var shopId = $(this).attr('id').split(',')[1];
				var productId = $(this).attr('id').split(',')[0];
				console.log(JSON.stringify(vm.list));
				console.log(shopId);
				for (var i = 0; i < vm.list.length; i++) {
					if (vm.list[i].shopId == shopId) {
						if(vm.list[i].products == {}){
							console.log('已经被全删了');
						}
						console.log(shopId);
						for (var j = 0; j < (vm.list[i].products).length; j++) {
							console.log('ddd');
							if (vm.list[i].products[j].id == $(this).attr('id')) {
								console.log('ddd');
								vm.list[i].products.splice(j,1);
							}
						}
					}

				}*/
			}
		});

		console.log(JSON.stringify(deleteArr));
		console.log(JSON.stringify(detailProduct));
		mui.fire(detailProduct, 'delete', {
			data: deleteArr
		});

		deleteArr = [];

	});

});