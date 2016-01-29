define(function(require, exports, module) {
	/**
	 *主页面通知子页面
	 * 通知内容为：
	 * 1、商品信息：productInfo
	 * 2、排序方式：按距离、销量、价格
	 * 3、筛选：打开上滑菜单，筛选完后通知sort.html页面，进行数据更改
	 */
	mui.init({
		gestureConfig: {
			doubletap: true
		},
		subpages: [{
			url: 'sort.html',
			id: 'sort.html',
			styles: {
				top: '90px',
				bottom: '0px',
				zindex: 999
			}
		}]
	});
	var Vue = require('../js/vue.js');
	var utils = require('../common/utils.js')

	window.addEventListener('getCity', function(event) {
		console.log("选择的城市为" + event.detail.city);
		vm.distance = event.detail.city;
	});
	//接收来自于sort.html的事件
	window.addEventListener('fromSort', function() {
		closeMenu();
	});

	self.getPosition = function() {
		plus.nativeUI.showWaiting('正在定位中..');
		plus.geolocation.getCurrentPosition(function(pos) {
			plus.nativeUI.closeWaiting();
			var str = '';
			var city = pos.address.city;
			var province = pos.address.province;
			var street = pos.address.street;
			var district = pos.address.district;
			if (typeof province != 'undefined') {
				str = str + province;
			}
			if (typeof district != "undefined") {
				str = str + district;
			}
			if (typeof street != "undefined") {
				str = str + street;
				console.log(str);
			}

			vm.distance = str;
		}, function() {

		}, {
			provider: 'baidu'
		});

	}
	document.getElementById("location").addEventListener('tap', function() {
		/*mui.openWindow({
			url: 'city.html',
			id: 'city.html'
		});*/
		var cityPicker3 = new mui.PopPicker({
			layer: 3
		});
		cityPicker3.setData(cityData3);
		console.log('寻找发货地址');
		cityPicker3.show(function(items) {
			alert(items);
		});

	});
	var subPage = null;
	var menu = null,
		main = null;
	var sortPage = null;
	var showMenu = false;
	//菜单切换
	var openMenu = function() {
		if (!showMenu) {
			//父webwiew设置遮罩
			//子菜单向上滑动


			menu.show('none', 0, function() {
				main.setStyle({
					mask: 'rgba(0,0,0,0.4)',
					transition: {
						duration: 250
					}
				});
				menu.setStyle({
					bottom: '0',
					transition: {
						duration: 250
					}
				});
				showMenu = true;
			});
			self._back = mui.back;
			mui.back = function() {
				closeMenu();
			}
			
		}
	}

	//关闭菜单
	var closeMenu = function() {
		if (showMenu) {
			menu.hide();
			showMenu = false;
			main.setStyle({
				mask: 'none'
			});
			mui.back = self._back;
		}
	}

	mui.plusReady(function() {
			//获取来自搜索界面、shop界面的事件
			menu = mui.preload({
				url: 'details-menu.html',
				id: 'details-menu.html',
				styles: {
					bottom: 0,
					height: '60%',
					width: '100%',
					zindex: 9997
				},
			});
			setTimeout(function() {
				self.getPosition();
			}, 2000);
			main = plus.webview.currentWebview();
			sortPage = plus.webview.getWebviewById('sort.html');
			console.log(main);
			main.addEventListener('maskClick', function() {
				closeMenu();
			});
			/*mui.back = function() {
					closeMenu();
				}*/


			/*subPage = plus.webview.currentWebview().children();*/
		})
		//切换状态

	var sortType = {
		name: 'sales',
		desc: -1
	};

	var targetEl = document.getElementById("distance");
	$('nav').on('tap', 'a', function(e) {
		var id = $(this).attr("id");
		//点击筛选按钮，打开筛选菜单,结束
		if (id == 'filter') {
			openMenu();
			return;
		}
		if (id == 'price') {
			vm.arrow = vm.arrow == 'desc' ? 'up' : 'desc';
			sortType.desc = 0 - sortType.desc;
		} else {
			sortType.desc = -1;
		}
		sortType.name = id;
		mui.fire(sortPage, 'noticeFromParent', {
				data: sortType
			})
			/*	$(this).addClass('header-active');
				targetEl.classList.remove('header-active');
				targetEl = this;*/

	});

	var vm = new Vue({
		el: '#list',
		data: {
			name: '',
			distance: '未定位',
			arrow: 'up'
		}

	});

	window.addEventListener('productName', function(event) {
		console.log(vm.name)
		vm.name = event.detail.data;
		/*mui.fire(sortPage,'productInfoFromProductList',{
			data:event.detail.data
		})*/

	});

});