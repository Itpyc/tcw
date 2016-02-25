/**
 * 用户登陆的基本流程：
 * 1、首先本地判断
 */

define(function(require, exports, module) {
	/*var db = openDatabase('mydb','1.0','test',2*1024*1024);
	db.transaction(function(tx){
		tx.executeSql('create table if not exists logs(id unique,log)');
		tx.executeSql('insert into logs(id,log)values(1,"pyc")');
	})*/
	mui.init({
		preloadPages: [{
			url: 'userInfo.html',
			id: 'userInfo.html'
		}]
	})
	var auths = {};
	var baseUrl = "http://192.168.0.107:8080/cunzhi/";
	self.authLogin = function(auth) {
		if (auth) {
			auth.login(function(e) {
				console.log(JSON.stringify(e.target.authResult));
				self.getInfo(auth);
			}, function(e) {
				mui.toast('获取服务列表失败');
			})
		}
	}
	self.getInfo = function(auth) {
		auth.getUserInfo(function(e) {
			console.log(JSON.stringify(auth.userInfo));
			localStorage.setItem('autoLogin', JSON.stringify(auth.userInfo));
			plus.nativeUI.showWaiting('授权登陆成功，正在跳转');
			setTimeout(function() {
				mui.fire(plus.webview.getWebviewById('userInfo.html'), 'authInfo', {
					data: auth.userInfo
				});
				mui.openWindow({
					id: 'userInfo.html'
				})
				plus.nativeUI.closeWaiting();
			}, 300);
		}, function(e) {});
	}

	var main = null;
	var pages = [];
	mui.plusReady(function() {
		main = plus.webview.currentWebview();

		pages.push(plus.webview.getWebviewById('tab-award.html'));
		pages.push(plus.webview.getWebviewById('offcanvas.html'));
		pages.push(plus.webview.getLaunchWebview());
		pages.push(plus.webview.getWebviewById('tab-settings.html'));
		//获取第三方服务列表
		plus.oauth.getServices(function(services) {
			for (var i in services) {
				var service = services[i];
				console.log(services[i])
				console.log(service.id)
				auths[service.id] = service;
			}
		});
		/*document.getElementById("qq").addEventListener('tap', function() {
			self.authLogin(auths['qq']);
		});*/
	});
	var accountBox = document.getElementById("account");
	var passwordBox = document.getElementById("password");
	/**
	 * 获取当前状态
	 **/
	var getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		console.log(stateText);
		return JSON.parse(stateText);
	};
	/**
	 * 设置当前状态
	 **/
	var setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	//存储用户状态
	var createState = function(data, callback) {
		var state = getState();
		state.account = "data.nickname";
		/*state.id = "data.id";
		state.nickname = "data.nickname";*/
		state.token = data.statusId;
		/*alert(data.statusId);*/
		setState(state);
		return callback();
	};
	var login = function(loginInfo, callback) {
		//判断用户信息的合法性
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 3) {
			return callback('账号最短为 3 个字符');
		}

		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}

		mui.ajax(baseUrl+'mobileLogin.action', {
			dataType: 'json',
			data: {
				loginName: loginInfo.account,
				password: loginInfo.password
			},
			type: 'get',
			timeout: 1000,
			success: function(data) {
				/*alert(JSON.stringify(data));*/
				console.log(data.code);
				if (data.code == "1") {
					mui.toast('登陆成功');
					/*for(var i in pages){
						alert(pages[i])
						mui.fire(pages[i],'isLogin');
					}*/
					localStorage.setItem('nickName',loginInfo.account);
					
					return createState(data, callback);
				} else {
					mui.toast('登陆失败');
				}

			},
			error: function(data) {
				return callback(data);
			}
		})

		//从后台服务器获取，判断用户是否合法
		/*var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});*/
		/*mui.ajax('')*/

		/*	mui.ajax('http://192.168.0.100:3000/share',{
				dataType:'json',
				type:'get',
				timeout:1000,
				success:function(data){
					alert(data);
				},
				error:function(err){
					mui.toast(err);
				}
			});*/

		/*mui.ajax('http://192.168.0.100:3000/users/list', {
				type: 'post',
				dataType: 'json',
				timeout: 1000,
				success: function(data) {
					alert(data);
				},
				error: function() {
				}
			});*/

		/*if (true) {
			return createState(loginInfo.account, callback);
		} else {
			return callback('用户名或密码错误');
		}*/
	};
	document.getElementById("login").addEventListener('tap', function() {
		/*var target = main.targetPage;
		console.log(target);*/
		var loginInfo = {
			account: accountBox.value,
			password: passwordBox.value
		};
		login(loginInfo, function(err) {
			console.log(err);
			if (err) {
				alert('验证不通过---' + localStorage.getItem('$state'));
			} else {
				mui.fire(pages[0], 'isLogin');
				mui.fire(pages[2], 'isLogin');
				mui.fire(pages[3],'isLogin');
				console.log(pages[0].id);
				console.log(pages[2].id);
				setTimeout(function() {
					mui.back();
				}, 100);

				/*mui.openWindow({
					url:'main.html',
					id:'main.html'
				});*/
			}
		});
		console.log(localStorage.getItem('$state'));
	});

	//注册
	document.getElementById("register").addEventListener('tap', function() {
		mui.openWindow({
			url: 'registerByPhone.html',
			id: 'registerByPhone.html'
		})
	})


});