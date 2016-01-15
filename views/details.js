define(function(require, exports, module) {
	mui.init({
		preloadPages: [{
			url: 'order.html',
			id: 'order.html'
		}]
	});
	/*window.addEventListener('details',function(event){
		vm.title = event.detail.id;
		console.log(vm.title)
	});*/

	window.addEventListener('productName:sort.html', function(e) {
		vm.title = e.detail.data;
	});

	mui('.mui-scroll-wrapper').scroll({});
	var self = exports;
	var Vue = require('../js/vue.js');
	var vm = new Vue({
		el: '#details',
		data: {
			title: ''
		},
		methods: {
			chat: function() {
				mui.openWindow({
					url: 'chat.html',
					id: 'chat'
				})
			}
		}
	});
	/*//弹出面板函数
	var pop = $('.my-popover');
	var mask = mui.createMask();
	//显示弹出
	self.show = function() {
			mask.show();
			pop.addClass('active');
			//重写返回键，按返回按钮时关闭弹出
			self._back = mui.back;
			mui.back = function() {
				self.hide();
			}
		}
		//隐藏弹出
	self.hide = function() {
		mask.close();
		pop.removeClass('active');
		mui.back = self._back;
	}
	mask[0].addEventListener('tap', function() {
		self.hide();
	});

	var buyOptions = {
		num: 0,
		pay: '',
		send: ''
	};
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
		buyOptions.pay = e.target.innerText;
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
		buyOptions.send = e.target.innerText;
		console.log(e.target.innerText);
	});


	document.getElementById("chat").addEventListener('tap', function() {
		mui.openWindow({
			url: 'chat.html',
			id: 'chat'
		})
	});
	document.getElementById("buyNow").addEventListener('tap', function() {
		self.show();
	});
	document.getElementById("submit").addEventListener('tap', function() {

		buyOptions.num = $('.mui-input-numbox').val();
		self.hide();
		mui.openWindow({
			id: 'order.html'
		})
	});*/

	//预加载三个界面
	/*var product = mui.preload({
		url: 'details-product.html',
		id: 'details-product.html',
		styles: {
			top: '45px',
			bottom: '51px'

		}
	});
	var detail = mui.preload({
		url: 'details-detail.html',
		id: 'details-detail.html',
		styles: {
			top: '45px',
			bottom: '51px'

		}
	});
	var comment = mui.preload({
		url: 'details-comment.html',
		id: 'details-comment.html',
		styles: {
			top: '45px',
			bottom: '51px'

		}
	});*/
	
		var subpages = ['details-product.html', 'details-detail.html', 'details-comment.html'];
			var subpage_style = {
				bottom: '0',
				top: '45px',
			};
			var aniShow = {};
			
			 //创建子页面，首个选项卡页面显示，其它均隐藏；
			mui.plusReady(function() {
				var selfPage = plus.webview.currentWebview();
				for (var i = 0; i < 3; i++) {
					var temp = {};
					var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if (i > 0) {
						sub.hide();
					}else{
						temp[subpages[i]] = "true";
						mui.extend(aniShow,temp);
					}
					selfPage.append(sub);
				}
			});
			 //当前激活选项
			var activeTab = subpages[0];
			 //选项卡点击事件
			mui('#sliderSegmentedControl1').on('tap', 'a', function(e) {
				var targetTab = this.getAttribute('href');
				if (targetTab == activeTab) {
					return;
				}
				//显示目标选项卡
				//若为iOS平台或非首次显示，则直接显示
				if(mui.os.ios||aniShow[targetTab]){
					plus.webview.show(targetTab);
				}else{
					//否则，使用fade-in动画，且保存变量
					var temp = {};
					temp[targetTab] = "true";
					mui.extend(aniShow,temp);
					plus.webview.show(targetTab,"fade-in",300);
				}
				//隐藏当前;
				plus.webview.hide(activeTab);
				//更改当前活跃的选项卡
				activeTab = targetTab;
			});
	
	
	
	






});