define(function(require, exports, module) {
	mui.init();
	var Vue = require('../js/vue.js');
	var utils = require('../common/utils.js');
	//示例数据

	var item1 = [];
	for (var i = 0; i < 30; i++) {
		item1.push({
			name: 'zhangsan' + i,
			id: i,
			content: '商品好'
		})
	}
	var item2 = [];
	for (var i = 0; i < 20; i++) {
		item2.push({
			name: 'zhangsan' + i,
			id: i,
			content: '商品一般'
		})
	}
	var item3 = [];
	for (var i = 0; i < 10; i++) {
		item3.push({
			name: 'zhangsan' + i,
			id: i,
			content: '商品差'
		})
	}
	var item4 = [];
	for (var i = 0; i < 5; i++) {
		item4.push({
			name: 'zhangsan' + i,
			id: i,
			content: '晒图'
		})
	}
	var item0 = item1.concat(item2).concat(item3).concat(item4);
	var vm = new Vue({
		el: '#details-comment',
		data: {
			items: item0,
			badges: []
		}
	});

	mui.plusReady(function() {
		mui('.mui-scroll-wrapper').scroll({});
		$('#commentList').on('tap', 'a', function(e) {
			mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
			var id = $(this).attr('id');
			console.log($(this).attr('id'));
			switch (id) {
				case 'all':
					vm.items = item0;
					break;
				case 'good':
					vm.items = item1;
					break;
				case 'middle':
					vm.items = item2;
					break;
				case 'bad':
					vm.items = item3;
					break;
				case 'picture':
					vm.items = item4;
					break;
				default:
					break;
			}
		});

		var badges = {
			all: item0.length,
			good: item1.length,
			middle: item2.length,
			bad: item3.length,
			picture: item4.length
		}
		vm.badges = badges;

		/*var pop = document.getElementById("popover");
		utils.init({
			el: pop
		});
		document.getElementById("shopCart").addEventListener('tap', function() {
			utils.show();
		});
		document.getElementById("buyNow").addEventListener('tap', function() {
			mui.openWindow({
				url: 'order.html',
				id: 'order.html'
			})
		});
		document.getElementById("submit").addEventListener('tap', function() {
			mui.toast('已经加入购物车');
			buyOptions.num = $('.mui-input-numbox').val();
			utils.hide();
		});*/
	});
	
	window.addEventListener('productInfoFromDetails',function(e){
		console.log(e.detail.data);
	});

});