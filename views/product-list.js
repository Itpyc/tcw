define(function(require, exports, module) {
	mui.init({
		gestureConfig: {
			doubletap: true
		},
		subpages: [{
			url: 'sort.html',
			id: 'sort.html',
			styles: {
				top: '45px',
				bottom: '0px',
			}
		}]
	});
	var Vue = require('../js/vue.js');
	mui.plusReady(function(){
		window.addEventListener('product-name', function(event) {
		vm.name = event.detail.title;
	});
	})
	
	
	

	var vm = new Vue({
		el: '#list',
		data: {
			name: ''
		}

	});

	/*	var vm = new Vue({
			el: "#details",
			data: {

			},
			methods: {

			}
		})*/

});