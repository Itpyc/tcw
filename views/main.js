define(function(require, exports, module) {
	mui.init();
	var baseUrl = "http://192.168.0.107:8080/cunzhi/";
	var menu, main = null;
	var menuShow = false;
	var awardPage = null;
	/**
	 * 创建子页面
	 */
	var sub_pages = ['tab-home.html', 'tab-cunzhi.html', 'tab-award.html', 'tab-settings.html'];
	var sub_title = ["首页", "村志", "抽奖", "个人中心"];
	var sub_style = {
		top: '45px',
		bottom: '51px',
	};

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

	/**
	 * 获取用户信息
	 * @param {Object} userId
	 * @param {Object} callback
	 */
	//queryUserLotteryDetail.action
	var getAwardInfo = function(userId, callback) {
		mui.ajax(baseUrl + 'queryUserLotteryDetail.action', {
			data: {
				loginName: userId
			},
			dataType: 'json',
			type: 'get',
			timeout: 1000,
			success: function(data) {
				console.log(data);
				return callback(data);
			},
			error: function(err) {
				return err;
			}
		})
	}

	/**
	 * 检查登陆状态
	 */
	var checkState = function() {
		var state = localStorage.getItem('$state');
		console.log(state);
		if (state == null) {
			mui.confirm('未登陆', '登陆提示', ['立即登陆', '取消'], function(e) {
				if (e.index == 0) {
					mui.openWindow({
						url: "login.html",
						id: 'login.html'
					})
				}
			});
		} else {
			var id = JSON.parse(state).token;
			console.log(id);
			getAwardInfo(id, function(data) {
				/*vm.times = data.time;
				vm.totalTimes = data.totalTimes;*/
				mui.fire(awardPage, 'awardInfo', {
					data: data
				})
				console.log(JSON.stringify(data));
			})
		}
	}

	mui.plusReady(function() {
		//判断启动
		checkArguments();
		main = plus.webview.currentWebview();
		/*var self = plus.webview.currentWebview();*/
		for (var i = 0; i < 4; i++) {
			var sub = plus.webview.create(sub_pages[i], sub_pages[i], sub_style);
			if (i > 0) {
				sub.hide();
			}
			main.append(sub);
		}
		awardPage = plus.webview.getWebviewById('tab-award.html');
		setTimeout(function() {

			plus.navigator.closeSplashscreen();
		}, 1000)
		document.getElementById("tab-award").addEventListener('tap', function() {
			checkState();
		});


		//预加载
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
			plus.nativeUI.closeWaiting();
		}, 2000);

		document.getElementById("toolbars").addEventListener('tap', function() {
			showMenu();
		});
		main.addEventListener('maskClick', closeMenu);
	});


	document.getElementById("search").addEventListener('tap', function() {
		mui.openWindow({
			url: 'search.html',
			id: 'search.html'
		})
	});
	// 判断启动方式
	function checkArguments() {
		console.log("plus.runtime.launcher: " + plus.runtime.launcher);
		var args = plus.runtime.arguments;
		console.log(args)
			//判断是否登陆
		var stat = localStorage.getItem('$state');
		var shareId = args.split("=")[1];
		/*	var shareId = "402880eb5315e0700153161a7cb00019";*/
		/*alert(shareId)*/

		if (shareId) {
			// 处理args参数，如打开新页面等
			/*	alert(args);*/
			//shareId
			//弹出一个对话框，通知用户领取。如果用户点击领取，则判断是否登陆。
			//如果登陆，则将登陆用户的id以及args传给后台.如果没有登陆，则跳转到登陆页面，登陆完成后再发送后台进行领取

			//获取到shareId、shareType
			//使用shareId从后台获取该链接的分享信息，获取到shareType
			//判断是否登陆，如果登陆了则直接抽奖，否则输入手机号进行抽奖
			//根据shareType来判断。1、如果shareType为1，表示来自群组。0为个人。2、如果是来自个人，则进行领取。如果是群组，则进行抽奖。

			//如果登陆成功，判断是来自于群组还是个人
			//1、查询该分享的详情
			mui.ajax(baseUrl + 'queryLotteryShareDetail.action', {
				data: {
					shareId: shareId
				},
				dataType: 'json',
				type: 'get',
				success: function(data) {
					console.log(data.shareType);
					if (data.code == "0") {
						alert(data.msg);
						return;
					}
					if (stat) {
						//查询分享明细
						//queryLotteryShareDetail.action
						//shareId	
						//"{""shareNum"":0,""fromUser"":""tc0001"",""code"":""1"",""shareType"":""1""}
						//{""code"":""0"",""msg"":""没有找到对应的分享数据""}"
						if (data.code == "0") {
							mui.toast(data.msg);
							return;
						}
						//0来自群组
						if (data.shareType == "0") {
							//跳转到抽奖界面,因为用户已经登陆，传过去的值为用户的名字loginName和shareId
							mui.openWindow({
								url: 'award.html',
								id: 'award.html',
								extras: {
									loginName: JSON.parse(stat).token,
									shareId: shareId,
									shareDetail: data
								}
							});
						}
						//1来自个人,则进行领取
						else if (data.shareType == "1") {
							mui.confirm("恭喜您获得抽奖次数，请点击领取", '领取抽奖次数', ['立即领取'], function() {
								//acceptLotteryShare.action
								//"{""code"":""0"",""msg"":""此次分享类型为群组,不能领取""}
								//{""allCounts"":250,""code"":""1"",""dayCounts"":5}"

								mui.ajax(baseUrl + 'acceptLotteryShare.action', {
									data: {
										loginName: JSON.parse(stat).token,
										shareId: shareId
									},
									dataType: 'json',
									type: 'get',
									timeout: 1000,
									success: function(data) {
										if (data.code == "1") {
											mui.alert('您的抽奖次数已经存入账户,账户剩余次数为: ' + data.allCounts + "次,今日可用次数为: " + data.dayCounts, '恭喜！');
											mui.fire(awardPage, 'refresh', {
												data: data
											});
										} else {
											alert(data.msg);
										}
									}
								});
							});
						}

					} else {
						//跳转到抽奖界面,没有登陆，直接到抽奖界面进行抽奖.传过去的值包括shareId
						mui.openWindow({
							url: 'award.html',
							id: 'award.html',
							extras: {
								shareId: shareId,
								shareDetail: data
							}
						});
					}
				},
				error: function() {

				}
			});
		}
	}
	// 处理从后台恢复
	document.addEventListener('newintent', function() {
		console.log("addEventListener: newintent");
		checkArguments();
	}, false);

	/*window.addEventListener('isLogin', function() {
		checkArguments();
	});*/


	var title = document.getElementById("title");
	var activeTab = sub_pages[0];
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');

		console.log(targetTab)
			/*if (targetTab == "tab-award.html") {
				checkState();
				console.log('ddd');
			}*/
		if (targetTab == activeTab) {
			return;
		}
		plus.webview.show(targetTab);

		if (targetTab == "tab-home.html") {
			title.innerHTML = "	<div id='search'>搜索所需要的内容<i  class='mui-icon mui-icon-search'></i></div>";
		} else {
			title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
		}

		//更换标题
		/*title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;*/
		//显示目标选项卡
		//若为iOS平台或非首次显示，则直接显示
		/*plus.webview.show(targetTab);*/
		//隐藏当前;
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		activeTab = targetTab;
	});
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