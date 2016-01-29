define(function(require, exports, module) {
	mui.init();
	var self = exports;
	var elementMaper = require('../js/element-maper.js');
	var Vue = require('../js/vue.js');
	self.el = {
		header: 'header.mui-bar',
		cityType: '.hotel-city-type',
		list: '#list'
	};
	/*self.alertPos = function(city) {
		var btnArr = ['是', '否']
		mui.confirm('当前位置：' + city, '定位', btnArr, function(e) {
			if (e.index == 0) {
				mui.fire(backPage, 'getCity', {
					city: city
				})
				mui.back();
			} else {}
		});
	};*/

	var backPage = null;
	mui.plusReady(function() {
		backPage = plus.webview.getWebviewById('product-list.html');
		console.log(backPage.id);
		document.getElementById("geo").addEventListener('tap', function() {
			plus.nativeUI.showWaiting('正在定位中..');
			plus.geolocation.getCurrentPosition(function(pos) {
				plus.nativeUI.closeWaiting();
				
				/*self.alertPos(pos.address.city + "  " + pos.address.street);*/
				var btnArr = ['是', '否'];
				mui.confirm('当前位置：' + pos.address.city + "  " + pos.address.street, '定位', btnArr, function(e) {
					if (e.index == 0) {
						mui.fire(backPage, 'getCity', {
							city: pos.address.city + "  " + pos.address.street
						});
						mui.back();
					} else {}
				});
			}, function() {}, {
				provider: 'baidu'
			});
		});

	});
	//元素与名称映射
	elementMaper.init(self);
	//calc hieght
	self.el.list.style.height = (document.body.offsetHeight - self.el.header.offsetHeight - self.el.cityType.offsetHeight) + 'px';
	var indexedList = mui(self.el.list).indexedList();

	mui('#list').on('tap', 'li', function() {
		var city = this.innerText;
		mui.fire(backPage, 'getCity', {
			city: city
		});
		mui.back();
	});
	var target = document.getElementById("chose");

	mui('.hotel-city-type').on('tap', 'a', function(event) {
		if (target == this) {
			alert('相同');
		} else {
			this.classList.add('active');
			target.classList.remove('active')
		}
		target = this;
	})
	/*mui.plusReady(function() {
	})*/
});