define(function(require,exports,module){
	mui.init();
	var infoArr = [];
	/*window.addEventListener('authInfo',function(e){
		console.log(JSON.stringify(e.detail.data));
		vm.userInfo = e.detail.data;
	});*/
	
	mui.plusReady(function(){
		vm.userInfo = plus.webview.currentWebview().userInfo;
		console.log(JSON.stringify(vm.userInfo));
	})
	
	var Vue = require('../js/vue.js');
	
	var vm = new Vue({
		el:'#userInfo',
		data:{
			userInfo:''
		}
	})
	
});