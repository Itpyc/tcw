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
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for (var i = cells.length, len = i + 20; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
				table.appendChild(li);
			}
		}, 1500);
	}
	function pullfresh() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		vm.cunzhiInfo.push({
			title: '东小口',
			abstract: '东小口村位于北京北郊，距昌平城区21公里，距八达岭高速路4公里，距立汤路4公里',
			content: '',
			img: ''
		});
	};

	var self = exports;
	var Vue = require('../js/vue.js');
	var $ = require('../js/require.js');

	var cunzhiInfo = [{
		title: '东小口',
		abstract: '东小口村位于北京北郊，距昌平城区21公里，距八达岭高速路4公里，距立汤路4公里',
		content: '',
		img: ''
	}, {
		title: '李董村',
		abstract: '东小口村位于北京北郊，距昌平城区21公里，距八达岭高速路4公里，距立汤路4公里',
		content: '',
		img: ''
	}, {
		title: '东小口',
		abstract: '东小口村位于北京北郊，距昌平城区21公里，距八达岭高速路4公里，距立汤路4公里',
		content: '',
		img: ''
	}, {
		title: '东小口',
		abstract: '东小口村位于北京北郊，距昌平城区21公里，距八达岭高速路4公里，距立汤路4公里',
		content: '',
		img: ''
	}];

	self.createFragment = function() {
	}

	var vm = new Vue({
		el: '#tab-cunzhi-inner',
		data: {
			cunzhiInfo: cunzhiInfo
		},
		methods: {

		}
	})
});