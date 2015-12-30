define(function(require, exports, module) {
	var self = exports;
	var Vue = require('../js/vue.js');
	/**
	 * 创建子页面
	 */
	var sub_pages = ['tab-home.html', 'tab-shop.html', 'tab-settings.html'];
	var sub_title = ["首页", "商铺", "设置"];
	self.createSubPages = function() {

		console.log(sub_pages.valueOf());
		var sub_style = {
			top: '45px',
			bottom: '51px'
		};
		mui.plusReady(function() {
			for (var i = 0; i < 3; i++) {
				var sub = plus.webview.create(sub_pages[i], sub_pages[i], sub_style);
				plus.webview.currentWebview().append(sub);
			}
		});
	};
	self.createSubPages();
	//vue
	Vue.directive('tab', {
		update: function(value) {
			mui.plusReady(function() {
				plus.webview.show('tab-home.html');
			});
			this.el.addEventListener('tap', function() {
				for (var i = 0; i < sub_pages.length; i++) {
					console.log(i);
					if (value == sub_pages[i]) {
						vm.title = sub_title[i];
						console.log(vm.title);
						plus.webview.show(value);
					} else {
						plus.webview.hide(sub_pages[i]);
					}
				}
			});
		}
	});

	var vm = new Vue({
		el: '#main',
		data: {
			title: '首页',
			test: 'this is test'
		},
		methods: {
			create: function() {
				self.createSubPages();
			}
		}
	});

	//设置退出方法
	var backButtonPress = 0;
	mui.back = function() {
		backButtonPress++;
		if (backButtonPress > 1) {
			plus.runtime.quit()
		} else {
			plus.nativeUI.toast('再次点击退出');
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
	}

});