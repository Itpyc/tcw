define(function(require, exports, module) {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}
		}
	});
	var count = 0;
	var self = exports;
	var Vue = require('../js/vue.js');
	var $ = require('../js/require.js');
	var cunzhiInfo = [];

	mui.plusReady(function() {
		if (plus.storage.getItem('villages')) {
			console.log(plus.storage.getItem('villages'));
			vm.cunzhiInfo = JSON.parse(plus.storage.getItem('villages'));
		} else {
			setTimeout(function() {
				mui.ajax('http://192.168.0.100:3000/users/list', {
					type: 'POST',
					dataType: 'json',
					timeout: 1000,
					success: function(data) {
						vm.cunzhiInfo = data;
						console.log(data);
						console.log(JSON.stringify(data));
						plus.storage.setItem('villages', JSON.stringify(data));
					}
				});
			}, 500);


		}
	});


	//获取村列表数据
	/*mui.plusReady(function() {
		if (plus.storage.getItem('villageList')) {
			vm.cunzhiInfo = JSON.stringify(plus.storage.getItem('villageList'));
			console.log(vm.cunzhiInfo);
		} else {
			mui.ajax('http://192.168.0.100:3000/users/list', {
				type: 'post',
				dataType: 'json',
				timeout: 1000,
				success: function(data) {
					vm.cunzhiInfo = data;
					data = JSON.stringify(data);
					console.log(data);
					plus.storage.setItem('villageList',data);
					alert(plus.storage.getItem('villageList'));
				}
			});
		}
		
	});*/


	/**
	 *上拉加载具体业务实现,使用ajax从服务器加载数据
	 */
	function pullfresh() {
		setTimeout(function() {
			mui.ajax('http://192.168.0.100:3000/users/list', {
				type: 'post',
				dataType: 'json',
				timeout: 1000,
				success: function(data) {
					console.log(data);
					for (var i in data) {
						console.log(data[i]);
						vm.cunzhiInfo.push(data[i]);
					}
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.length < 5);
				},
				error: function() {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}
			});
		}, 1000);
	};

	var vm = new Vue({
		el: '#tab-cunzhi-inner',
		data: {
			cunzhiInfo: cunzhiInfo
		},
		methods: {

		}
	});
	//处理点击进入村志详情界面
	var targetPage = mui.preload({
		url: 'cunzhiInner.html',
		id: 'cunzhiInner.html'
	});

	mui('#villagelist').on('tap', 'li', function() {
		var name = this.getAttribute('id');
		console.log(targetPage)
			//触发target
		mui.fire(targetPage, 'viliageName', {
			data: name
		});
		mui.openWindow({
			id: 'cunzhiInner.html'
		});

	});





});