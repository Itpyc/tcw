define('login', function(require, exports, module) {
	var self = exports;
	var Vue = require('./vue');
	mui.init();
	mui.plusReady(function() {
		var model = plus.device.model;
		console.log(model);
	});
	new Vue({
		el: '#login-vm',
		data: {
			test: 'this is a test'
		},
		methods: {
			toLogin: function() {
				/*	alert('this is a test');*/
				mui.openWindow({
					url: './main.html',
					id: 'main'
				});
			}
		}
	});
	self.test = function() {
		alert('this is a test');
	}
});