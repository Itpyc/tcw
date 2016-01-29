define(function(require, exports, module) {
	mui.init();
	var utils = require('../common/utils.js');
	
	window.addEventListener('shoperName',function(e){
		console.log(e.detail.data);
		vm.phoneNumber = 10086;
	});
	
	mui.plusReady(function() {
		document.getElementById("chatInline").addEventListener('tap', function() {
			var btnArry = [{
				title: '微信聊天'
			}, {
				title: '在线咨询'
			}];

			plus.nativeUI.actionSheet({
				title: '咨询卖家',
				cancel: '取消',
				buttons: btnArry
			}, function(e) {
				switch (e.index) {
					case 1:
						plus.nativeUI.showWaiting("卖家的微信号已经复制到粘贴板");
						setTimeout(function() {
							utils.copyToClip('百姓通村网');
							openWeixin();
							plus.nativeUI.closeWaiting();
						}, 1000);
						break;
					case 2:
						mui.openWindow({
							url: 'chat.html',
							id: 'chat.html'
						});
						break;
					default:
						break;
				}
			})
		});
	});

	function openWeixin() {
		if (plus.os.name == "Android") {
			plus.runtime.launchApplication({
				pname: "com.tencent.mm"
			}, function(e) {
				plus.nativeUI.confirm("检查到您未安装\"微信\"，是否到商城搜索下载？", function(i) {
					if (i.index == 0) {
						androidMarket("com.tencent.mm");
					}
				});
			});
		} else if (plus.os.name == "iOS") {
			plus.runtime.launchApplication({
				action: "weixin://RnUbAwvEilb1rU9g9yBU"
			}, function(e) {
				plus.nativeUI.confirm("检查到您未安装\"微信\"，是否到商城搜索下载？", function(i) {
					if (i.index == 0) {
						iosAppstore("itunes.apple.com/cn/app/wechat/id414478124?mt=8");
					}
				});
			});
		}
	}
	mui('.mui-scroll-wrapper').scroll({
		indicators: true
	});
	/*document.getElementById("chatInline").addEventListener('tap', function() {
		mui.openWindow({
			url: 'chat.html',
			id: 'chat.html'
		});
	});*/
	var Vue = require('../js/vue.js');
	var sellerInfo = {
		name: "商铺1",
		chatId: '1',
		phone: '12345',
		list: [{
			title: '梨子',
			img: 'pear.jpg'
		}, {

			title: '苹果',
			img: 'apple.jpg'
		}, {
			title: '香蕉',
			img: 'banana.jpg'
		}, {
			title: '葡萄',
			img: 'grape.jpg'
		}, {
			title: '白菜',
			img: 'baicai.jpg'
		}, {
			title: '芹菜',
			img: 'qincai.jpg'
		}]
	};
	mui('#productList').on('tap', 'li', function() {
		mui.openWindow({
			url: 'details.html',
			id: 'details.html'
		})
	});
	var vm = new Vue({
		el: '#sellerHome',
		data: {
			info: sellerInfo,
			phoneNumber:''
		}
	})

});