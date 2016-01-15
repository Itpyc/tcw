define(function(require, exports, module) {
	//主页面预加载
	mui.init({});
	var menu, main = null;
	var menuShow = false;
	mui.plusReady(function() {
		
		plus.nativeUI.showWaiting("请耐心等待，正在加载中。。。",{
			round:'10px'
		});
		
		document.getElementById("menu").addEventListener('tap', function() {
			plus.webview.getWebviewById(vm.pages).evalJS("mui('.mui-popover').popover('toggle');");
		});
		main = plus.webview.currentWebview();
		main.addEventListener('maskClick', closeMenu);
		//setTimeout的目的是等待窗体动画结束后，再执行create webview操作，避免资源竞争，导致窗口动画不流畅；
		//延迟预加载页面，防止资源竞争
		setTimeout(function() {
			menu = mui.preload({
				id: 'offcanvas.html',
				url: 'offcanvas.html',
				styles: {
					left: 0,
					width: '70%',
					zindex: -1
				}
			});
			mui.preload({
				url: 'shop.html',
				id: 'shop.html'
			});
			mui.preload({
				url: 'search.html',
				id: 'search.html'
			});
			mui.preload({
				url: 'city.html',
				id: 'city.html'
			});
			mui.preload({
				url: 'sellerHome.html',
				id: 'sellerHome.html'
			});
			
			plus.nativeUI.closeWaiting();
		}, 800);

		function showMenu() {
			if (!menuShow) {
				//给侧滑菜单一个透明遮罩放置误点
				menu.setStyle({
					mask: 'rgba(0,0,0,0)'
				});
				//开始侧滑
				menu.show('none', 0, function() {
					main.setStyle({
						mask: 'rgba(0,0,0,0.4)',
						left: '70%',
						transition: {
							duration: 150
						}
					});
					//移除menu的mask
					mui.later(function() {
						menu.setStyle({
							mask: "none"
						});
					}, 160);
					menuShow = true;
				});

			}
		}

		function closeMenu() {
			if (menuShow) {
				//主菜单移动回原位置
				main.setStyle({
					left: '0',
					mask: 'none',
					transition: {
						duration: 150
					}
				});
				menuShow = false;
				mui.later(function() {
					menu.hide();
				}, 200);
			}
		}

		document.getElementById("personZoom").addEventListener('tap', function() {
			showMenu();
		});
		//主界面向右滑动，若菜单未显示，则显示菜单；否则不做任何操作
		window.addEventListener("swiperight", showMenu);
		//主界面向左滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
		window.addEventListener("swipeleft", closeMenu);
		
		var showGuide = plus.storage.getItem("lauchFlag");
		console.log(showGuide);
		if (showGuide) {
			//有值，说明已经显示过了，无需显示；
			//关闭splash页面；
			plus.navigator.closeSplashscreen();
			plus.navigator.setFullscreen(false);
		} else {
			//显示启动导航
			mui.openWindow({
				id: 'welcome.html',
				url: 'welcome.html',
				show: {
					aniShow: 'none'
				},
				waiting: {
					autoShow: false
				}
			});
		}
	});

	var self = exports;
	var Vue = require('../js/vue.js');
	/**
	 * 创建子页面
	 */
	var sub_pages = ['tab-home.html', 'tab-cunzhi.html', 'tab-zhifu.html', 'tab-settings.html'];
	var sub_title = ["首页", "村志", "致富经", "个人中心"];
	self.createSubPages = function() {
		console.log(sub_pages.valueOf());
		var sub_style = {
			top: '45px',
			bottom: '51px',
		};
		mui.plusReady(function() {
			for (var i = 0; i < 4; i++) {
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
				$('.mui-title span').addClass('mui-hidden');
			});
			this.el.addEventListener('tap', function() {
				for (var i = 0; i < sub_pages.length; i++) {
					console.log(i);
					if (value == sub_pages[i]) {
						vm.title = sub_title[i];
						console.log(vm.title);
						vm.pages = value;
						plus.webview.show(value);
					} else {
						plus.webview.getWebviewById(sub_pages[i]).evalJS("mui('.mui-popover').popover('hide');");
						plus.webview.hide(sub_pages[i]);
					}
				}
			});
		}
	});
	/*
	 * 定制头部标题栏
	 */
	var homeTitle = "首页<i id='search' class='mui-icon mui-icon-search'></i>";
	var homeTitle1 = '<div class="mui-input-row"><input id="search" type="text" class="mui-input-clear" placeholder="请输入您要搜索的内容"></div>';
	var cunzhiTitle = '<span class="">村志</span>';
	var zhifuTitle = '<span class="">致富经</span>';
	var settingsTitle = '<span class="">个人中心</span>';
	Vue.directive('title', function(value) {
		switch (value) {
			case "首页":
				$('.mui-title').empty();
				$('.mui-title').append(homeTitle);
				document.getElementById("search").addEventListener('tap', function() {
					mui.openWindow({
						id: 'search.html'
					})
				});
				break;
			case "村志":
				$('.mui-title').empty();
				$('.mui-title').append(cunzhiTitle);
				break;
			case "致富经":
				$('.mui-title').empty();
				$('.mui-title').append(zhifuTitle);
				break;
			case "个人中心":
				$('.mui-title').empty();
				$('.mui-title').append(settingsTitle);
				break;
			default:
				break;
		}

	});

	var vm = new Vue({
		el: '#main',
		data: {
			title: '首页',
			test: 'this is test',
			pages: 'tab-home.html'
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