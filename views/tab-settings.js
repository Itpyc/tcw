define(function(require, exports, module) {
	mui.init();
	var logout = function(callback) {
		var btnArray = [{
			title: '退出当前账号'
		}, {
			title: '退出应用'
		}];
		plus.nativeUI.actionSheet({
			cancel: '取消',
			buttons: btnArray
		}, function(e) {
			switch (e.index) {
				case 1:
					console.log('退出当前账号');
					return callback('logout');
					break;
				case 2:
					console.log('退出应用');
					localStorage.removeItem('$autoLogin');
					return callback('quit');
					break;
				default:
					break;
			}

		});
	};
	//shares中保存service信息
	var shares = [];
	mui.plusReady(function() {
		//获取服务列表
		plus.share.getServices(function(s) {
			if (s && s.length > 0) {
				for (var i = 0; i < s.length; i++) {
					var t = s[i];
					shares[t.id] = t;
				}
				console.log(JSON.stringify(shares['qq']));
			}
		}, function() {
			console.log("获取分享服务列表失败");
		});
		//注销登陆按钮
		var logoutBtn = document.getElementById("logout");
		logoutBtn.addEventListener('tap', function() {
			logout(function(data) {
				switch (data) {
					case 'logout':
						localStorage.removeItem('$state');
						mui.openWindow({
							url: 'login.html',
							id: 'login.html',
							show: {
								aniShow: 'pop-in'
							}
						});
						break;
					case 'quit':
						plus.runtime.quit();
						break;
					default:
						break;
				}
			});
		});
		/*document.getElementById("barcode").addEventListener('tap', function(e) {
			mui.openWindow({
				url: 'barcode_scan.html',
				id: 'barcode_scan.html'
			})
		});*/
	});



	function shareMessage(s, msg) {
		/*if (pic && pic.realUrl) {
			msg.pictures = [pic.realUrl];
		}*/
		s.send(msg, function() {
			alert("分享到\"" + s.description + "\"成功！ ");
		}, function(e) {
			alert("分享到\"" + s.description + "\"失败: " + e.code + " - " + e.message);
		});
	}
	//判断是否已经授权，如果已经授权则直接分享消息，否则进行授权
	//传入的id是服务所对应的在shares数组中的坐标位置
	function shareAction(share, msg) {
		/*if (!s) {
			mui.toast("无效的分享服务！");
			return;
		}
		if (s.authenticated) {
			 alert("---已授权---");
			shareMessage(s, ex);
		} else {
			alert("---未授权---");
			s.authorize(function() {
				shareMessage(s, ex);
			}, function(e) {
				alert("认证授权失败：" + e.code + " - " + e.message);
			});
		}*/

		var shareMsg = {
			extra: {
				scene: msg.ex
			}
		};
		shareMsg.href = "http://www.tcw5000.com/";
		shareMsg.content = "欢迎访问百姓通村网";
		shareMsg.thumbs = ['../image/tcwLogo.jpg'];
		shareMsg.title = '测试分享';
		if (share) {
			if (share.authenticated) {
				shareMessage(share, shareMsg);
			} else {
				share.authorize(function() {
					shareMessage(share, shareMsg);
				}, function(e) {
					console.log("认证授权失败：" + e.code + " - " + e.message);
				});
			}
		} else {
			mui.toast("无法获取分享服务，请检查manifest.json中分享插件参数配置，并重新打包")
		}
	}
	//分享链接点击事件
	document.getElementById("donation").addEventListener('tap', function() {
		console.log(JSON.stringify(shares));
		var ids = [{
				id: "weixin",
				ex: "WXSceneSession"
			}, {
				id: "weixin",
				ex: "WXSceneTimeline"
			}, {
				id: "qq"
			}, {
				id: "qqQun"
			}],
			bts = [{
				title: "发送给微信好友"
			}, {
				title: "分享到微信群"
			}, {
				title: "转赠给QQ好友"
			}, {
				title: "分享到QQ群"
			}, {
				title: '当面扫码'
			}];

		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: bts
		}, function(e) {
			console.log(e.index);
			var i = e.index;
			mui.toast(i);
			var bts = ["确认", "取消"];
			layer.open({
				title: '请输入要转赠的次数',
				type: 0,
				skin: 'layui-layer-demo', //样式类名
				closeBtn: 0, //不显示关闭按钮
				shift: 2,
				shadeClose: true, //开启遮罩关闭
				content: '<input id="times" style="" type="number" />',
				btn: ['确认', '取消'],
				yes: function(index, layero) {
					console.log(document.getElementById("times").value)
					switch (i) {
						case 1:
							//此处向后台发送转送请求，包括转赠的次数，用户的id标识、要转向的地方（如微信好友、微信群还是QQ好友QQ群）等，获取成功后则进行转赠，否则返回，不进行下一步动作
							//通知后台这是发给微信好友的
							mui.ajax('http://192.168.0.100:3000/users/share', {
								data: {
									id: 'zhangsan',
									num: 11,
									type: 'weixinhaoyou'
								},
								dataType: "text",
								type: 'get',
								timeout: 1000,
								success: function(data) {
									/*alert(data);*/
								}
							})
							shareAction(shares['weixin'], {
								ex: "WXSceneSession"
							});
							break;
						case 2:
							shareAction(shares['weixin'], {
								ex: "WXSceneSession"
							});
							break;
						case 3:
							plus.nativeUI.
							shareAction(shares['qq'], {
								content: "test"
							});
							break;
						case 4:
							shareAction(shares['qq'], {
								content: "test"
							});
							break;
						case 5:
							//分享给微信群
							/*shareAction(3);*/
							mui.openWindow({
								url: 'shareBacode.html',
								id: 'shareBacode.html'
							});
							break;
						default:
							break;
					}
					layer.close(index);
				},
				cancle: function() {}
			});
















			/*	plus.nativeUI.prompt("请输入要转赠的次数", function(e) {
					if (e.index == 0) {
						plus.nativeUI.confirm('您要转赠次数为' + e.value, function(e) {
							if (e.index == 0) {
								console.log('dafa')
								
							} else {
								mui.toast('取消转赠');
							}

						}, '确认转赠', bts);
					}
				}, "转赠", "次数", bts);*/
		});

	});

	document.getElementById("times").addEventListener('tap', function() {
		$('#award').toggleClass('mui-hidden');
	});
	document.getElementById("getMore").addEventListener('tap', function() {
		alert('跳转到充值页面');
	});
	document.getElementById("rightNow").addEventListener('tap', function() {
		mui.openWindow({
			url: 'award.html',
			id: 'award.html'
		})
	});
	document.getElementById("cunzhi").addEventListener('tap',function(){
		console.log('cunzhi');
	});
	
});