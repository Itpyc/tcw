/**
 *商品基本信息展示子页面1:商品的筛选和添加
 * 
 * 选择添加到购物车后，通知后台，该用户名下又添加一个商品，传给后台该商品的Id和其卖家的信息
 * 
 * 当用户想要查看该商品的信息时，跳转到购物车页面，并且从后台获取该用户的选择的货品信息
 */

define(function(require, exports, module) {
	mui.init();
	var cart = null;
	var Vue = require('../js/vue.js')
	mui('.mui-scroll-wrapper').scroll({});
	//弹出面板函数
	var pop = $('.my-popover');
	var mask = mui.createMask();
	var hide = function() {
			mask.close();
			pop.removeClass('active');
			mui.back = self._back;
		}
		//显示弹出
	var show = function() {
			mask.show();
			pop.addClass('active');
			//重写返回键，按返回按钮时关闭弹出
			self._back = mui.back;
			mui.back = function() {
				hide();
			}
		}
		//隐藏弹出

	mask[0].addEventListener('tap', function() {
		hide();
	});
	var listArry = [];
	var buyOptions = {
		shopId: '',
		productsInfo: {
			id: '',
			name: '',
			num: 0,
			pay: '',
			send: ''
		}
	};
	//接收
	var productName = '';
	window.addEventListener('productInfoFromDetails', function(e) {
		productName = e.detail.data;
		console.log(e.detail.data);
	});
	
	
	var targetPay = null;
	$('.howToPay').on('tap', 'li', function(e) {
		if (targetPay == null) {
			targetPay = $(this);
			console.log("target==null");
		}
		if (targetPay != $(this)) {
			targetPay.removeClass('chosen');
			$(this).addClass('chosen');
		}
		targetPay = $(this);
		/*	buyOptions.pay = e.target.innerText;*/
		console.log(e.target.innerText);
	});
	var targetGet = null;
	$('.howToGet').on('tap', 'li', function(e) {
		if (targetGet == null) {
			targetGet = $(this);
			console.log("target==null");
		}
		if (targetGet != $(this)) {
			targetGet.removeClass('chosen');
			$(this).addClass('chosen');
		}
		targetGet = $(this);
		/*	buyOptions.send = e.target.innerText;*/
		console.log(e.target.innerText);
	});
	var cart = null;
	mui.plusReady(function() {
		cart = plus.webview.getWebviewById('shoppingCart.html');
	});
	document.getElementById("submit").addEventListener('tap', function() {
		var tempArr = [];
		/*	console.log(cart);*/
		/*	console.log(plus.storage.getItem('options'));*/
		console.log(productName);
		buyOptions.shopId = productName.split(',')[1];
		buyOptions.productsInfo.id = productName;
		buyOptions.productsInfo.name = productName.split(',')[0];
		buyOptions.productsInfo.num = $('.mui-input-numbox').val();
		/*if (buyOptions.name == null) {
			console.log('没有选中名字')
		}
		if (buyOptions.num <= 0) {
			mui.toast('请选择数量'); 
			return;
		}
		if (buyOptions.pay == '') {
			mui.toast('请选择付款方式');
			return;
		}
		if (buyOptions.send == '') {
			mui.toast('请选择发货方式');
			return;
		}*/
		$('.chosen').each(function(index) {
			if (index == 0) {
				buyOptions.productsInfo.pay = this.innerText;
			}
			if (index == 1) {
				buyOptions.productsInfo.send = this.innerText;
			}
		});

		console.log(JSON.stringify(listArry));
		console.log(JSON.stringify(buyOptions))
		
		for(var i=0;i<listArry.length;i++){
			if(buyOptions.productsInfo.id == listArry[i].productsInfo.id){
				console.log('找到相同商品');
				mui.toast('商品已经存在，请不要重复添加');
				return;
			}
		}
		if (JSON.stringify(listArry).indexOf(JSON.stringify(buyOptions)) == -1) {
			listArry.push(buyOptions);
			/*tempArr.push(buyOptions);*/
			console.log('从details传过去的数据:' + JSON.stringify(listArry));
			
			mui.fire(cart, 'add', {
				data: listArry
			});

			mui.toast('已经加入购物车');
			hide();
			buyOptions = {
				shopId: '',
				productsInfo: {
					id: '',
					name: '',
					num: 0,
					pay: '',
					send: ''
				}
			};
		} else {
			console.log('该商品已经存在');
			mui.toast('商品已经存在，请不要重复添加');
		}
		
		tempArr = [];

	});
	
	var commentInfo = [{
		nickName:'test01',
		star:3,
		date:"2016-2-22",
		content:'商品还可以，还可以，可以，以。。。'
	},{
		nickName:'test02',
		star:5,
		date:"2016-2-21",
		content:'商品非常好，非常好，常好，好~'
		
	}]
	
	//vue
	var vm = new Vue({
		el:'#details',
		data:{
			commentInfo:commentInfo
		}
	})
	
	
	//监听删除事件
	window.addEventListener('delete',function(e){
		console.log(JSON.stringify(e.detail.data));
	});
	
	document.getElementById("chat").addEventListener('tap', function() {
		mui.openWindow({
			url: 'chat.html',
			id: 'chat'
		})
	});
	document.getElementById("shopCart").addEventListener('tap', function() {
		show();
	});
	document.getElementById("buyNow").addEventListener('tap', function() {
		mui.openWindow({
			url: 'order.html',
			id: 'order.html'
		})
	});

});