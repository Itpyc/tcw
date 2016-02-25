define(function(require, exports, module) {
	mui.init();
	//判断用户登陆信息
	/*var state = localStorage.getItem('$state');
	window.addEventListener('isLogin', function(e) {
		var state = localStorage.getItem('$state');
		console.log(state);
	});*/
	document.getElementById("userInfo").addEventListener('tap', function() {
		console.log(localStorage.getItem('$state'));
		var state = localStorage.getItem('$state');
		if (state) {
			mui.toast('已经登陆');
		} else {
			mui.openWindow({
				url: 'login.html',
				id: 'login.html',
				extras: {
					targetPage: 'shop.html'
				}
			});
		}
		if (state) {
			mui.openWindow({
						url: 'userInfo.html',
						id: 'userInfo.html',
						extras: {
							userInfo: state
						}
					})
			
			/*mui.ajax('http://192.168.0.100:3000/users/userInfo', {
				data: {
					id: JSON.parse(state).id
				},
				dataType: 'json',
				type: 'get',
				timeout: 1000,
				success: function(data) {
					localStorage.setItem('userInfo', JSON.stringify(data));
					console.log(localStorage.getItem('userInfo'));
					mui.openWindow({
						url: 'userInfo.html',
						id: 'userInfo.html',
						extras: {
							userInfo: data
						}
					})
				},
				error: function(err) {
					mui.toast('当前网络出现问题');
				}
			})*/
		} else {
			/*mui.confirm('未登陆，是否登陆？','未登陆',['是','否'],function(){
				
			}])*/

		}



	});
});